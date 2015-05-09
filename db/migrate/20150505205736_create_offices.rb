class CreateOffices < ActiveRecord::Migration
  def change
    create_table :offices do |t|
      t.string :title
      t.text :address
      t.string :latitude
      t.string :longitude
      t.text :description
      t.string :schedule

      t.timestamps null: false
    end
  end
end
