if not @error
  json.success true
else
  json.success false
  json.error @error
end
