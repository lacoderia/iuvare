class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|
      t.integer :asset_id
      t.integer :contact_id
      t.string :token
      t.datetime :expiration
      t.text :description

      t.timestamps null: false
    end
  end
end
