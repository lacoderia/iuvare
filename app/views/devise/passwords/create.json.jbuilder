json.success @success
if @success
  json.set! :result do
    json.token @token
  end
else
  json.error @error
end
