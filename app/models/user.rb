class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, 
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :upline, class_name: "User"
  has_many :downlines, class_name: "User", foreign_key: "upline_id"
  has_many :invitations
  has_many :goals
  has_many :test_scores
  has_and_belongs_to_many :roles
  has_many :collages
  
  has_attached_file :picture, :styles => { :original => "300x300>" }, :default_url => ""
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/

  scope :all_downlines, -> (id) {where("upline_id = ?", id)}
  scope :cycle_downlines, -> (id) {where("upline_id = ? and downline_position is not null", id).order(:downline_position)}
  scope :downline_at_position, -> (id, position) {where(upline_id: id, downline_position: position)}
  scope :by_xango_id, -> (xango_id){where(xango_id: xango_id)}

  def role?(role)
    return !!self.roles.find_by_name(role)
  end

  def register token
    user = User.find_by_email(self.email)
  	unless user
      invitations = Invitation.where("recipient_email = ? AND token = ?", self.email, token)
    	if invitations.size == 1
        if self.upline_id
          upline = User.find(self.upline_id)
          downline_no = upline.downlines.where("downline_position is not null").count
          self.downline_position = downline_no + 1 if downline_no < 4
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

  def self.change_position user_id, position
    downline = User.find(user_id)
    if downline
      downlines = User.downline_at_position(downline.upline_id, position)
      if downlines.size == 1
        downlines[0].downline_position = nil
        downlines[0].save
      end
      downline.downline_position = position
      downline.save
    end
    downline
  end
end
