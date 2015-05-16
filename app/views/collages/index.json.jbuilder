json.array!(@collages) do |collage|
  json.extract! collage, :id, :user_id, :name, :order
  json.url collage_url(collage, format: :json)
end
