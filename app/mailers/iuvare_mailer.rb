class IuvareMailer < ActionMailer::Base
  default from: "\"Iuvare\" <from@example.com>"

  def invitation_mail(user_id, recipient_email, recipient_name)
  	@user = User.find(user_id)
  	@recipient = recipient_name
  	mail(to: recipient_email, subject: "Te invitamos a registarte a iuvare.mx")
  end

end
