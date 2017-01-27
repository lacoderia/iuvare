class RemoveIuvareIdIndexFromUsers < ActiveRecord::Migration
  def change
    remove_index :users, name: "index_users_on_iuvare_id"    
  end
end
