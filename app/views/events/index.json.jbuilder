json.array!(@events) do |event|
  json.extract! event, :id, :title, :date, :description, :picture
  json.url event_url(event, format: :json)
end
