class RemoveIndexFromAssets < ActiveRecord::Migration
  def change
  	remove_index :assets, name: "index_assets_on_test_id"
  end
end
