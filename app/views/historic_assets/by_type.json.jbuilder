if not @historic_assets.empty?
  json.success true
  json.set! :result do
    json.array!(@historic_assets) do |ha|
      json.extract! ha, :id, :description, :historic_asset_type
    end
  end
else
  json.success true 
  json.set! :result do
    json.nil!    
  end
end
