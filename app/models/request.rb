class Request < ActiveRecord::Base
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
 
end
