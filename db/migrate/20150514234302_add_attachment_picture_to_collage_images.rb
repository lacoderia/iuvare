class AddAttachmentPictureToCollageImages < ActiveRecord::Migration
  def self.up
    change_table :collage_images do |t|
      t.attachment :picture
    end
  end

  def self.down
    remove_attachment :collage_images, :picture
  end
end
