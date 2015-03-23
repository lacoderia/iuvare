json.success @success
if @success
  json.result @user
else
  json.error @error
end
