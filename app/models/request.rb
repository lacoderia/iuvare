class Request < ActiveRecord::Base

  belongs_to :user

  STATUSES = [
    ['pending','pendiente'],
    ['accepted','aceptado'],
    ['rejected','rechazado'],
  ]

  validates :status, inclusion: {in: STATUSES.map{ |pairs| pairs[0] } }
  
  scope :pending, -> { where(status: 'pending') }
  scope :accepted, -> { where(status: 'accepted') }
  scope :visible, -> { shere(visible: true) }

  state_machine :status, :initial => 'pending' do
    transition 'pending' => 'accepted', on: :accept
    transition 'pending' => 'rejected', on: :reject
  end
 
  def create_request
    self.status = "pending"
    self.visible = true
    self.save
  end

  def accept_request
    begin
      self.accept!
      invitation = Invitation.new(user_id: self.user_id, recipient_name: self.source_name, recipient_email: source_email)
      invitation.generate_invitation
    rescue StateMachine::InvalidTransition => error
    end
    self
  end

  def reject_request
    begin
      self.reject!
    rescue StateMachine::InvalidTransition => error
    end
    self
  end

end
