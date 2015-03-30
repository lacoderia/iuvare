if @request.errors.empty?
	json.success true
	json.set! :result do 
		json.extract! @request, :id, :source_name, :source_email, :source_text, :status, :user_id
	end
else
	json.success false
	json.error "La solicitud ya fue aprobada/rechazada anteriormente."
end