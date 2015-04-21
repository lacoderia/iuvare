class Goal < ActiveRecord::Base
  belongs_to :user

  TYPES = [
    ['be', 'que quiero ser'],
    ['do', 'que quiero hacer'],
    ['have', 'que quiero tener'],
    ['travel', 'a donde quiero viajar'],
    ['share', 'que quiero compartir'],
    ['worry_not', 'de que no me quiero preocupar'],
  ]

  validates :goal_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }

  scope :by_user, -> (user) { where(user_id: user.id) }
  scope :type_be, -> { where(goal_type: 'be') }
  scope :type_do, -> { where(goal_type: 'do') }
  scope :type_have, -> { where(goal_type: 'have') }
  scope :type_travel, -> { where(goal_type: 'travel') }
  scope :type_share, -> { where(goal_type: 'share') }
  scope :type_worry_not, -> { where(goal_type: 'worry_not') }

end
