class IuvareMailer < ActionMailer::Base
  default from: "\"Iuvare\" <contacto@iuvare.mx>"

  def send_invitation(invitation)
    @user = invitation.user.first_name
    @recipient = invitation.recipient_name
    @token = invitation.token
    mail(to: invitation.recipient_email, subject: "Te invitamos a formar parte de Iuvare")
  end

  def send_plan(plan, sender_user)
    @plan = plan
    @sender_user = sender_user
    mail(to: sender_user.email, subject: "Invitación a IUVARE - Confidencial")     
  end

  def send_video(video, sender_user)
    @video = video
    @sender_user = sender_user
    mail(to: sender_user.email, subject: "Invitación a IUVARE - Más información")     
  end

  def send_answers(user, test_score)
    @user = user
    @test_score = test_score
    mail(to: user.email, subject: "Video IUVARE - Visualizado")
  end

  def send_delivery_info(email, body)
    @body = body
    mail(to: email, subject: "Kit IUVARE - Comprado")
  end

  def send_contact(contact)
    @contact = contact
    mail(to: "contacto@iuvare.mx", subject: "Contacto desde IUVARE.MX")
  end

end
