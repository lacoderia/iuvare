class ChangeDefaultsToRequest < ActiveRecord::Migration
  def change
  	change_column_default :requests, :visible, true
  	change_column_default :requests, :status, "pending"
  end
end
