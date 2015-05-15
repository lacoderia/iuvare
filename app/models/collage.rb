class Collage < ActiveRecord::Base
  belongs_to :user
  has_many :collage_images
end
