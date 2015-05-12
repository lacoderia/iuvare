class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :title
      t.datetime :date
      t.text :description
      t.string :picture

      t.timestamps null: false
    end
  end
end
