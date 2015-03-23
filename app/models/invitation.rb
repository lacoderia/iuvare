class Invitation < ActiveRecord::Base

	belongs_to :user

	def generate_invitation
		self.token = SecureRandom.base64
		self.save
		# send mail
	end
end