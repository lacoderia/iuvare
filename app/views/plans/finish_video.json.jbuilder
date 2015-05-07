if not @error
  json.success true
  json.set! :result do
    json.extract! @plan, :id, :asset_id, :token, :expiration, :description
    json.set! :contact do
      json.extract! @plan.contact, :id, :user_id, :name, :email, :phone, :description, :status
    end
  end
else
  json.success false 
  json.error @error
end
