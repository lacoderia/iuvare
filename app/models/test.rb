class Test < ActiveRecord::Base
  has_many :test_scores
  has_many :questions
end
