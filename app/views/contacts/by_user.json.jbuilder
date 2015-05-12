json.success true
json.set! :result do 
  json.set! :contacts do
    json.array! (@contacts) do |contact|
      json.extract! contact, :id, :user_id, :name, :email, :phone, :description, :status
      json.set! :test_score do
        json.extract! contact.test_score, :id, :user_id, :score, :description if contact.test_score
      end
    end
  end
end
