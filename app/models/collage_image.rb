class CollageImage < ActiveRecord::Base
  belongs_to :collage

  has_attached_file :picture, :styles => { :original => "300x" }, :default_url => ""
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/

  def self.create_by_user_id picture, user_id, order
    user = User.find(user_id)
    collage = user.collages.first
    if not collage
      collage = Collage.create(user_id: user_id, name: "Default", order: 1)
    end
    
    return CollageImage.create(collage_id: collage.id, picture: picture, order: order)
  end
end
