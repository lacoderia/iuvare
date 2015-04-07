class AddDownlineUplineColumnsToUsers < ActiveRecord::Migration
  def change
  	add_column :users, :downline_position, :integer
  	add_column :users, :upline_id, :integer
  end
end
