class FixAssetsAndTestsRelationship < ActiveRecord::Migration
  def change
    remove_index :tests, name: :index_tests_on_asset_id
    remove_column :tests, :asset_id
  
  	add_column :assets, :test_id, :integer
    add_foreign_key :assets, :tests
    add_index "assets", "test_id", name: "index_assets_on_test_id", unique: true, using: :btree
  end
end
