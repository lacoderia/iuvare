class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :upline, class_name: "User"
  has_many :downlines, class_name: "User", foreign_key: "upline_id"
  has_many :invitations

  scope :all_downlines, -> (id) {where("upline_id = ? and active = ?", id, true)}
  scope :cycle_downlines, -> (id) {where("upline_id = ? and active = ? and downline_position is not null", id, true).order(:downline_position)}

  def register token
    user = User.find_by_email(self.email)
  	unless user
      invitations = Invitation.where("recipient_email = ? AND token = ?", self.email, token)
    	if invitations.size == 1
        upline = User.find_by_xango_id(self.placement_xango_id)
        if upline
          self.upline_id = upline.id
          downline_no = upline.downlines.where("downline_position is not null").count
          self.downline_position = downline_no + 1 if downline_no < 3
        end
    		self.save
    	else
    		self.errors.add(:email, "Necesitas una invitación válida para poderte registrar. Solicítala a tu upline o premier.")
    		false
    	end
    else
      self.errors.add(:email, "Ya existe un usuario registrado con ese correo electrónico.")
      false
    end
  end

  def self.get_all_downlines user_id
    downlines = User.all_downlines(user_id)
  end

  def self.get_cycle_downlines user_id
    downlines = User.cycle_downlines(user_id)
  end
end
