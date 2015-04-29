if not @errors
  json.success true
  json.set! :result do
    json.extract! @test, :id, :name, :test_type, :code
    json.set! :test_scores do
      json.array! (@test_scores) do |test_score|
        json.extract! test_score, :id, :user_id, :test_id, :score, :description
      end
    end
  end
else
  json.success false
  json.error @errors
end
