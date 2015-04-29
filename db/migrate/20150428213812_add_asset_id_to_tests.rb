class AddAssetIdToTests < ActiveRecord::Migration
  def change
    add_column :tests, :asset_id, :integer
    add_foreign_key :tests, :assets
    add_index "tests", "asset_id", name: "index_tests_on_asset_id", unique: true, using: :btree
  end
end
