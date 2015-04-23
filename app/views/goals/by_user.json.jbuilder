json.success true
json.set! :result do 
  json.set! :goals do
    json.array! (@goals) do |goal|
      json.extract! goal, :id, :user_id, :dream, :goal, :date, :goal_type
    end
  end
end
