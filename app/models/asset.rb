class Asset < ActiveRecord::Base

  #has_many :plans
  has_one :test
  
  TYPES = [
    ['audio', 'audio'],
    ['seminar', 'seminario'],
    ['convention', 'convencion'],
    ['training', 'capacitacion'],
    ['document', 'documento']
  ]

  validates :asset_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }

end
