class CreateCollageImages < ActiveRecord::Migration
  def change
    create_table :collage_images do |t|
      t.integer :collage_id
      t.string :picture
      t.integer :order

      t.timestamps null: false
    end
  end
end
