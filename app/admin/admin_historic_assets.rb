ActiveAdmin.register HistoricAsset, :as => "Lista Materiales" do
	
  actions :all, :except => [:show]

  permit_params :id, :number, :color, :author, :name, :historic_asset_type, :source, :active

  config.filters = false

  index :title => "Lista Material" do
    column :number
    column :name
    column :author
    column :historic_asset_type
    column :color
    column :source
    column :active
    
    actions :defaults => true
  end

  form do |f|
    f.inputs "Detalles de Lista Material" do
      f.input :number
      f.input :name
      f.input :author
      f.input :source
      f.input :active
      f.input :color, as: :select, collection: HistoricAsset::COLORS
      f.input :historic_asset_type, as: :select, collection: HistoricAsset::TYPES.map{|t| t[0]}
    end
    f.actions
  end

  config.filters = true
  filter :historic_asset_type, as: :select, collection: HistoricAsset::TYPES.map{|t| t[0]}

end
