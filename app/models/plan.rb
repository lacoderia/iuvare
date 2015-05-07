class Plan < ActiveRecord::Base
  
  def self.send_video
    contact_id = params[:contact_id]
    asset _id = params[:asset_id]
    exipiration = Time.zone.now + 120.minutes
    sender_user = User.find(params[:user_id])

    plan = Plan.create(token: SecureRandom.urlsafe_base64, asset_id: asset_id, contact_id: contact_id, expiration: expiration)

    IuvareMailer.send_video(plan, sender_user).deliver_now
    contact = Contact.find(contact_id)
    contact.invite!

    return plan
  end

  def self.finish_video plan
    contact = plan.contact
    contact.watch_video!

    return plan
  end

  def self.can_watch_video token
    time_now = Time.zone.now
    plan = Plan.includes({asset: {tests: :answers} }).find_by(token: token) #includes assets, tests, questions, answers
    if plan.expiration > time_now
      raise 'Ya han pasado más de 120 minutos desde que se realizó la invitación.'
    else
      return plan
    end
  end
  
end
