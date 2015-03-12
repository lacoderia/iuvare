class Invitation < ActiveRecord::Base

	belongs_to :user
	
	def self.send_with_token
		token = SecureRandom.uuid
		invitation = Invitation.create(user_id: user_id, recipient_name: recipient_name, recipient_email: recipient_email, token: token)
		InvitationMailer.invitation_mail(params[:sender_email], params[:recipient_email]).deliver_now
	end
end