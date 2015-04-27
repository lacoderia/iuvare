class CreateTests < ActiveRecord::Migration
  def change
    create_table :tests do |t|
      t.string :name
      t.string :test_type
      t.string :code

      t.timestamps null: false
    end
  end
end
