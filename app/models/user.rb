class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, 
         :recoverable, :rememberable, :trackable, :validatable, :session_limitable

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
  scope :by_iuvare_id, -> (iuvare_id){where(iuvare_id: iuvare_id)}
  
  FREE_MONTHS = 1
  OUTDATED_FREE_MONTHS = 6
  NEW_FREE_MONTHS = 6
  LAUNCHING_DATE = Time.zone.local(2015,9,1,0)

  OUTDATED_ID = 36487
  NEW_ID = 37033

  def role?(role)
    return !!self.roles.find_by_name(role)
  end

  def register token
    user = User.find_by_email(self.email)
    unless user
      if self.iuvare_id == self.sponsor_iuvare_id or self.iuvare_id == self.placement_iuvare_id
        self.errors.add(:registration, "Tu ID de IUVARE no puede ser igual que el de tu auspiciador.")
        false
      elsif User.where("iuvare_id = ?", self.iuvare_id).count >= 1
        self.errors.add(:registration, "Tu ID de IUVARE ya está siendo usado por alguien más, por favor escríbenos a contacto@iuvare.mx")
        false
      else
        invitations = Invitation.where("token = ? and used = ?", token, false)
        if invitations.size == 1
          if not (invitations.first.user.iuvare_id == self.sponsor_iuvare_id or invitations.first.user.iuvare_id == self.placement_iuvare_id)
            self.errors.add(:registration, "El ID IUVARE en patrocinio o colocación debe ser el de la persona que te mandó la invitación.")
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
      #TODO: add error for duplicate iuvare_id field
      self.errors.add(:registration, "Ya existe un usuario registrado con ese correo electrónico.")
      false
    end
  end

  def progress
    result = {}

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
    result[:free_date] = nil

    if not user.kit_bought?
      result[:valid_account] = false  
      result[:message] = "Necesitas adquirir tu kit de IUVARE para continuar."
      #result[:payment_options] << Payment.paypal_pay_object("Kit de inicio con envío", user)
      result[:payment_options] << Payment.paypal_pay_object("Kit de inicio, entrega presencial", user)
    elsif not user.active?
      result[:valid_account] = false  
      result[:message] = "Tu acceso a la página ha sido suspendido."
    else

      time_now = Time.zone.now

      if user.iuvare_id.to_i >= NEW_ID
        months_free_date = user.created_at + NEW_FREE_MONTHS.months
      elsif user.iuvare_id.to_i >= OUTDATED_ID and user.iuvare_id.to_i < NEW_ID 
        months_free_date = user.created_at + OUTDATED_FREE_MONTHS.months
      else
        #months_free_date = time_now
        #ALL USERS FREE ACCESS
        months_free_date = user.created_at + FREE_MONTHS.months
      end

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
        result[:free_date] = months_free_date
      end

    end

    return result
  end
end
