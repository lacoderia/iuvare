json.array!(@goals) do |goal|
  json.extract! goal, :id, :user_id, :dream, :goal, :date, :goal_type
  json.url goal_url(goal, format: :json)
end
