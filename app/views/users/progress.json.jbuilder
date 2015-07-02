json.success @success
if @success
  json.set! :result do 
    json.extract! @funnel, :to_invite, :contacted, :to_close, :to_register, :registered
  end
else
  json.error @error
end
