class Test < ActiveRecord::Base
  has_many :test_scores
  has_many :questions
  has_many :assets

  TYPES = [
    ['percentage', 'porcentaje'],
    ['correct_incorrect', 'correcto/incorrecto'],
    ['multiple', 'multiple']
  ]

  PERCENTAGE_ANSWER_TYPES_BY_CODE = {
    'color' => ['yellow', 'red', 'green', 'blue'],  
    'brain' =>['right', 'left']
  }

  SPANISH_LABELS = {
    'yellow' => 'Amarillo', 'red' => 'Rojo', 'green' => 'Verde', 'blue' => 'Azul' 
  }

  validates :test_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }

  def self.by_code code
    Test.includes(:questions => :answers).find_by(code: code)
  end

  def self.by_user user_id
    Test.includes(:test_scores).where("test_scores.user_id" => user_id)
  end

  def self.by_code_and_user code, user_id
    Test.includes(:test_scores).find_by("test_scores.user_id" => user_id, "code" => code)
  end
end
