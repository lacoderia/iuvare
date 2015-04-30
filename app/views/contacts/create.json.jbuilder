if not @errors
  json.success true
  json.set! :result do 
    json.extract! @contact, :id, :user_id, :name, :email, :phone, :description, :status
  end
else
  json.success false
  json.error @errors
end
