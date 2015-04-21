class Invitation < ActiveRecord::Base

	belongs_to :user

	def generate_invitation
		self.token = SecureRandom.urlsafe_base64
		self.save!
		IuvareMailer.send_invitation(self).deliver_now
	end
end
