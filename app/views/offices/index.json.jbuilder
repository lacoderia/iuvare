json.array!(@offices) do |office|
  json.extract! office, :id, :name, :address, :latitude, :longitude, :description, :schedule
  json.url office_url(office, format: :json)
end
