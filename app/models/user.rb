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
  has_many :payments
  has_many :contacts
  
  has_attached_file :picture, :styles => { :original => "300x300#" }, :default_url => ""
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/
  validates_attachment_size :picture, :less_than => 5.megabytes, :unless => Proc.new {|m| m[:picture].nil?}

  scope :all_downlines, -> (id) {where("upline_id = ?", id).includes(:test_scores => :test)}
  scope :cycle_downlines, -> (id) {where("upline_id = ?", id).order(:downline_position)}
  scope :downline_at_position, -> (id, position) {where(upline_id: id, downline_position: position)}
  scope :by_xango_id, -> (xango_id){where(xango_id: xango_id)}
  
  FREE_MONTHS = 1
  LAUNCHING_DATE = Time.zone.local(2015,9,1,0)

  def role?(role)
    return !!self.roles.find_by_name(role)
  end

  def register token
    user = User.find_by_email(self.email)
    unless user
      if self.xango_id == self.sponsor_xango_id or self.xango_id == self.placement_xango_id
        self.errors.add(:registration, "Tu ID de Xango no puede ser igual que el de tu auspiciador.")
        false
      else
        invitations = Invitation.where("token = ? and used = ?", token, false)
        if invitations.size == 1
          if not (invitations.first.user.xango_id == self.sponsor_xango_id or invitations.first.user.xango_id == self.placement_xango_id)
            self.errors.add(:registration, "El ID Xango en patrocinio o colocación debe el de la persona que te mandó la invitación.")
            false
          else
            if self.upline_id
              upline = User.find(self.upline_id)
              downline_no = upline.downlines.where("downline_position is not null").count
              self.downline_position = downline_no + 1 if downline_no < 4
            end
            invitations.first.update_attribute("used", true)
            self.save
          end
        else
          self.errors.add(:registration, "Necesitas una invitación válida para poderte registrar. Solicítala a tu upline o premier.")
          false
        end
      end
    else
      self.errors.add(:registration, "Ya existe un usuario registrado con ese correo electrónico.")
      false
    end
  end

  def progress
    result = {}
    #result[:to_invite] = self.contacts.count
    #result[:contacted] = self.contacts.where("status NOT IN ('to_invite', 'ruled_out')").count
    #result[:to_close] = self.contacts.where("status NOT IN ('to_invite', 'ruled_out', 'contacted')").count
    #result[:to_register] = self.contacts.where("status NOT IN ('to_invite', 'ruled_out', 'contacted', 'to_close')").count
    #result[:registered] = self.contacts.where(status: "registered").count

    # Without cumulative addition
    result[:to_invite] = self.contacts.where(status: 'to_invite').count
    result[:contacted] = self.contacts.where(status: 'contacted').count
    result[:to_close] = self.contacts.where(status: 'to_close').count
    result[:to_register] = self.contacts.where(status: 'to_register').count    
    result[:registered] = self.contacts.where(status: 'registered').count
    return result
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

  def self.validate_access user
    result = {}
    result[:payment_options] = []

    if not user.kit_bought?
      result[:valid_account] = false  
      result[:message] = "Necesitas adquirir tu kit de IUVARE para continuar."
      result[:payment_options] << Payment.paypal_pay_object("Kit de inicio", user)
    else

      time_now = Time.zone.now

      #if (user.iuvare_id.to_i >= 33231) or (user.iuvare_id.to_i >= 700 and user.iuvare_id.to_i <= 725)
      #  months_free_date = user.created_at + FREE_MONTHS.months
      #else
      #  months_free_date = time_now
      #end
      
      #ALL USERS FREE ACCESS
      months_free_date = user.created_at + FREE_MONTHS.months

      if time_now >= months_free_date
        if user.payment_expiration
          if time_now > user.payment_expiration
            result[:valid_account] = false  
            result[:message] = "Tu acceso pagado ha finalizado."
            result[:payment_options] << Payment.paypal_pay_object("Un mes", user)
            result[:payment_options] << Payment.paypal_pay_object("Tres meses", user)
            result[:payment_options] << Payment.paypal_pay_object("Seis meses", user)
            result[:payment_options] << Payment.paypal_pay_object("Nueve meses", user)
            result[:payment_options] << Payment.paypal_pay_object("Doce meses", user)
          else
            result[:valid_account] = true  
            result[:message] = "Acceso pagado."
          end
        else
          result[:valid_account] = false  
          result[:message] = "Tu acceso gratis ha finalizado."
          result[:payment_options] << Payment.paypal_pay_object("Un mes", user)
          result[:payment_options] << Payment.paypal_pay_object("Tres meses", user)
          result[:payment_options] << Payment.paypal_pay_object("Seis meses", user)
          result[:payment_options] << Payment.paypal_pay_object("Nueve meses", user)
          result[:payment_options] << Payment.paypal_pay_object("Doce meses", user)
        end
      else
        result[:valid_account] = true  
        result[:message] = "Acceso gratis."
      end

    end

    return result
  end
end
