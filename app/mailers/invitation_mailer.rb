class InvitationMailer < ActionMailer::Base
  default from: "from@example.com"

  def invitation_mail(sender_email, recipient_email)
  	mail(to: recipient_email, subject: 'Invitacion Iuvare')
  end

end
