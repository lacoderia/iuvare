class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.integer :user_id
      t.string :name
      t.string :email
      t.string :phone
      t.string :description
      t.string :status

      t.timestamps null: false
    end
  end
end
