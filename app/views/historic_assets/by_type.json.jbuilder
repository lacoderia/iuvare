if not @historic_assets.empty?
  json.success true
  json.set! :result do
    json.array!(@historic_assets) do |ha|
      json.extract! ha, :id, :number, :color, :author, :name, :historic_asset_type, :source, :description
    end
  end
else
  json.success true 
  json.set! :result do
    json.nil!    
  end
end
