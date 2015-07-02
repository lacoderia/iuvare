if not @assets.empty?
  json.success true 
  json.set! :result do
    json.set! :assets do
      json.array! (@assets) do |asset|
        json.extract! asset, :id, :title, :description, :author, :source, :purchasable, :price, :asset_type
        json.stream_url "/stream?asset_type=#{asset.asset_type}&source=#{asset.source}"
        json.set! :test do
          if asset.test
            json.extract! asset.test, :id, :name, :test_type
          else
            json.nil!
          end
        end
      end
    end
  end
else
  json.success true 
  json.set! :result do
    json.nil!    
  end
end
