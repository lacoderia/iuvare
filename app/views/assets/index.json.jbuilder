json.array!(@assets) do |asset|
  json.extract! asset, :id, :title, :description, :author, :source, :purchasable, :price, :asset_type
  json.url asset_url(asset, format: :json)
end
