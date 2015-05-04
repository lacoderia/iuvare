class Plan < ActiveRecord::Base
  
  def self.send_video
    contact = Contact.find(params[:contact_id])
    sender_user = User.find(params[:user_id]) 
    IuvareMailer.send_video(contact, sender_user).deliver_now
    contact.invite!
  end

  def self.finish_video plan
    contact = plan.contact
    contact.watch_video!
  end
  
end
