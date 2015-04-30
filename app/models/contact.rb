class Contact < ActiveRecord::Base

  belongs_to :user

  STATUSES = [
    ['to_invite', 'por invitar'],
    ['contacted', 'contactado'],
    ['to_close', 'por cerrar'],
    ['ruled_out', 'descartado'],
    ['registered', 'inscrito']
  ]

  validates :status, inclusion: {in: STATUSES.map{ |pairs| pairs[0] } }

  state_machine :status, :initial => 'to_invite' do
    transition 'to_invite' => 'contacted', on: :invite
    transition 'contacted' => 'to_close', on: :watch_video
    transition 'to_close' => 'ruled_out', on: :rule_out
    transition 'to_close' => 'registered', on: :register
  end
  

  
end
