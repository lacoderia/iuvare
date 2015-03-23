json.success @success
if @success
	json.result "result"
else
	json.error @user.errors.messages[:email][0]
end