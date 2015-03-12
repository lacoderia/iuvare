class CreateRequests < ActiveRecord::Migration
  def change
    create_table :requests do |t|
      t.string :source_name
      t.string :source_email
      t.string :source_text
      t.integer :user_id
      t.boolean :visible
      t.integer :request_state_id

      t.timestamps
    end
  end
end
