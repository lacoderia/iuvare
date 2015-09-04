class AddFieldsToHistoricAssets < ActiveRecord::Migration
  def change
    add_column :historic_assets, :number, :string
    add_column :historic_assets, :name, :string
    add_column :historic_assets, :author, :string
    add_column :historic_assets, :color, :string
    remove_column :historic_assets, :description
  end
end
