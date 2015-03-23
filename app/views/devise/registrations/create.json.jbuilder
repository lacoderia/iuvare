json.success @success
if @success
  json.result @user
else
  json.error @user.errors.messages[:email][0]
end
