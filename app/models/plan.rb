class Plan < ActiveRecord::Base

  belongs_to :asset
  belongs_to :contact

  validates :token, :asset_id, :contact_id, :expiration, presence: true
  
  def self.send_video contact_id, user_id, asset_id

    asset = Asset.find(asset_id)
    expiration = Time.zone.now + 120.minutes
    sender_user = User.find(user_id)

    video = Plan.create!(token: SecureRandom.urlsafe_base64, asset_id: asset_id, contact_id: contact_id, expiration: expiration)

    if asset.asset_type == "plan"
      IuvareMailer.send_plan(video, sender_user).deliver_now
      contact = Contact.find(contact_id)
      if contact.status?(:to_invite)
        contact.invite!
      end
    else
      IuvareMailer.send_video(video, sender_user).deliver_now
    end

    return video 
  end

  def self.finish_video plan
    contact = plan.contact
    if contact.status?(:contacted) or contact.status?(:to_invite)
      contact.watch_video!
    end

    return plan
  end

  def self.can_watch_video token
    time_now = Time.zone.now
    plan = Plan.includes({asset: {test: {questions: :answers} } }).find_by(token: token) #includes assets, tests, questions, answers
    if plan.expiration < time_now
      raise 'Ya han pasado más de 120 minutos desde que se realizó la invitación'
    else
      return plan
    end
  end
  
end
