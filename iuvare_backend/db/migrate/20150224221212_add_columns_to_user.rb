class AddColumnsToUser < ActiveRecord::Migration
  def change
  	add_column :users, :uid, :string
  	add_column :users, :picture, :string
  end
end
