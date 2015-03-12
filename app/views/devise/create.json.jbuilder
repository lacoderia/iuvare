json.success @success
if @success
	json.result "result"
else
	#error_message = ''
	#@user.errors.messages.each do |key, array|
	#	error_message += 
	#end
	json.error "error"
end