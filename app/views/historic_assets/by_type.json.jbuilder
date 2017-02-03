if not @historic_assets.empty?
  json.success true
  json.set! :result do
    json.array!(@historic_assets) do |ha|
      json.extract! ha, :id, :number, :author, :name, :historic_asset_type, :source, :description
      json.colors ha.color.split(",") if ha.color
      json.stream_url "/stream?asset_type=#{ha.historic_asset_type}&source=#{ha.source}"
    end
  end
else
  json.success true 
  json.set! :result do
    json.nil!    
  end
end
