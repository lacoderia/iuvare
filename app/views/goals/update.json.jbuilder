if not @errors
  json.success true
  json.set! :result do 
    json.extract! @goal, :id, :user_id, :dream, :goal, :date, :goal_type
  end
else
  json.success false
  json.error @errors
end
