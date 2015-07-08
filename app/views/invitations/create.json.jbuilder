if not @error
  json.success true
  json.set! :result do
    json.extract! @invitation, :id, :user_id, :recipient_name, :recipient_email, :token
  end
else
  json.success false
  json.error @error
end
