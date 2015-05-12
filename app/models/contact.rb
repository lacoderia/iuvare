class Contact < ActiveRecord::Base

  belongs_to :user
  has_many :plans
  has_one :test_score

  STATUSES = [
    ['to_invite', 'por invitar'],
    ['contacted', 'contactado'],
    ['to_close', 'por cerrar'],
    ['ruled_out', 'descartado'],
    ['registered', 'inscrito']
  ]

  validates :status, inclusion: {in: STATUSES.map{ |pairs| pairs[0] } }
  
  before_validation :initialize_status

  state_machine :status, :initial => 'to_invite' do
    transition 'to_invite' => 'contacted', on: :invite
    transition 'contacted' => 'to_close', on: :watch_video
    transition 'to_close' => 'ruled_out', on: :rule_out
    transition 'to_close' => 'registered', on: :register
  end

  def self.transitions
    transitions = {}
    transitions[:to_invite] = {previous: nil, next: [:contacted]}
    transitions[:contacted] = {previous: [:to_invite], next: [:to_close]}
    transitions[:to_close] = {previous: [:contacted], next: [:ruled_out, :registered]}
    transitions[:ruled_out] = {previous: [:to_close], next: nil}
    transitions[:registered] = {previous: [:to_close], next: nil}
    return transitions
  end 

  def update_with_status_check contact_params

    if new_status = contact_params[:status]
      can_update_status = false
      self.status_transitions.each do |st|
        if st.to == new_status
          can_update_status = true
          break
        end
      end

      if can_update_status
        self.update_attributes(contact_params)
      else
        raise "Cambio de estado inválido"
      end
    else
      self.update_attributes(contact_params)
    end

  end
    
  private

    def initialize_status 
      self.status = 'to_invite' unless self.status
    end
end
