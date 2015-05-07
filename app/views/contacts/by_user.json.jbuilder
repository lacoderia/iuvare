json.success true
json.set! :result do 
  json.set! :contacts do
    json.array! (@contacts) do |contact|
      json.extract! contact, :id, :user_id, :name, :email, :phone, :description, :status
    end
  end
end
