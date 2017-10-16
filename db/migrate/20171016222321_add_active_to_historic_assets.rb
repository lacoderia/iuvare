class AddActiveToHistoricAssets < ActiveRecord::Migration
  def change
    add_column :historic_assets, :active, :boolean, default: true
  end
end
