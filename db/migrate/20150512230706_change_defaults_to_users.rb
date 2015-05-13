class ChangeDefaultsToUsers < ActiveRecord::Migration
  def change
  	change_column_default :users, :active, true
  end
end
