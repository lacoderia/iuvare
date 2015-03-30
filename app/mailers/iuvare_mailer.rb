class IuvareMailer < ActionMailer::Base
  default from: "\"Iuvare\" <from@example.com>"

  def send_invitation(invitation)
  	@user = invitation.user.first_name
  	@recipient = invitation.recipient_name
  	@token = invitation.token
  	mail(to: invitation.recipient_email, subject: "Te invitamos a formar parte de Iuvare")
  end

end
