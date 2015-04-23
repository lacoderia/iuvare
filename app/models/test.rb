class Test < ActiveRecord::Base
  has_many :test_scores
  has_many :questions

  TYPES = [
    ['percentage', 'porcentaje'],
    ['correct_incorrect', 'correcto/incorrecto']
  ]

  PERCENTAGE_ANSWER_TYPES_BY_CODE = {
    'color' => ['yellow', 'red', 'green', 'blue'],  
    'brain' =>['right', 'left']
  }

  validates :test_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }
end
