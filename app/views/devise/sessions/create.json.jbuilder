json.success @success
if @success
	json.result "result"
else
	json.error @error
end