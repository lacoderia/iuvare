class CreateAssets < ActiveRecord::Migration
  def change
    create_table :assets do |t|
      t.string :title
      t.text :description
      t.string :author
      t.string :source
      t.boolean :purchasable
      t.float :price
      t.string :asset_type

      t.timestamps null: false
    end
  end
end
