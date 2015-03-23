json.success true
json.set! :result do 
	json.extract! @invitation, :id, :user_id, :recipient_name, :recipient_email, :token
end