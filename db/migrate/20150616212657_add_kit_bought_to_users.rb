class AddKitBoughtToUsers < ActiveRecord::Migration
  def change
    add_column :users, :kit_bought, :boolean, :default => true
  end
end
