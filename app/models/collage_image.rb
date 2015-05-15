class CollageImage < ActiveRecord::Base
  belongs_to :collage

  has_attached_file :picture, :styles => { :original => "300x" }, :default_url => ""
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/
end
