class AddPendingForeignKeys < ActiveRecord::Migration
  def change
    add_foreign_key :contacts, :users
    add_foreign_key :plans, :assets
    add_foreign_key :plans, :contacts
    add_foreign_key :collages, :users
    add_foreign_key :collage_images, :collages
  end
end
