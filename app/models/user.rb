class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :invitations

  def register token
  	invitations = Invitation.where("recipient_email = ? AND token = ?", self.email, token)
  	if invitations.size == 1
  		self.save
  	else
  		self.errors.add(:email, "Necesitas una invitación válida para poderte registrar. Solicítala a tu upline o premier.")
  		false
  	end
  end
end
