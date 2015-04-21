class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.integer :user_id
      t.text :dream
      t.string :goal
      t.datetime :date
      t.string :goal_type

      t.timestamps null: false
    end

    add_foreign_key :goals, :users
    add_index "goals", ["user_id", "goal_type"], name: "index_goals_on_user_id_and_type", unique: true, using: :btree
  end
end
