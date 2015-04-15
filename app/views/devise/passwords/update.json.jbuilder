json.success @success
if @success
  json.result {}
else
  json.error @error
end
