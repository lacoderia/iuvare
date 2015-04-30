class CreateTestScores < ActiveRecord::Migration
  def change
    create_table :test_scores do |t|
      t.integer :user_id
      t.integer :test_id
      t.float :score
      t.text :description

      t.timestamps null: false
    end

    add_foreign_key :test_scores, :users
    add_foreign_key :test_scores, :tests
  end
end
