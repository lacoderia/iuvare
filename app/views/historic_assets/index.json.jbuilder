json.array!(@historic_assets) do |historic_asset|
  json.extract! historic_asset, :id, :description, :historic_asset_type
  json.url historic_asset_url(historic_asset, format: :json)
end
