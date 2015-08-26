class CreateHistoricAssets < ActiveRecord::Migration
  def change
    create_table :historic_assets do |t|
      t.text :description
      t.string :historic_asset_type

      t.timestamps null: false
    end
  end
end
