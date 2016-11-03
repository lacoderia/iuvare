class AddSourceAndDescriptionToHistoricAssets < ActiveRecord::Migration
  def change
    add_column :historic_assets, :source, :string
    add_column :historic_assets, :description, :string
  end
end
