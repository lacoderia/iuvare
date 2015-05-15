class CreateCollages < ActiveRecord::Migration
  def change
    create_table :collages do |t|
      t.integer :user_id
      t.string :name
      t.integer :order

      t.timestamps null: false
    end
  end
end
