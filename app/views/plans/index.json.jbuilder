json.array!(@plans) do |plan|
  json.extract! plan, :id, :asset_id, :contact_id, :token, :expiration, :description
  json.url plan_url(plan, format: :json)
end
