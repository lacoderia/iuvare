class AddIuvareIdIndexToUsers < ActiveRecord::Migration
  def change
    add_index :users, :iuvare_id, unique: true
  end
end
