json.success true
json.set! :result do
  json.array!(@offices) do |office|
    json.extract! office, :id, :name, :address, :latitude, :longitude, :description, :schedule
  end
end
