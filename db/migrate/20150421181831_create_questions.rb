class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :test_id
      t.text :text

      t.timestamps null: false
    end

    add_foreign_key :questions, :tests
  end
end
