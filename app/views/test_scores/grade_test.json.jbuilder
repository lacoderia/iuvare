if not @error
  json.success true
  json.set! :result do
    json.extract! @test, :id, :name, :test_type, :code
    json.set! :scores do
      json.array! (@test_scores) do |test_score|
        json.extract! test_score, :id, :user_id, :score, :description
        json.description_spanish Test::SPANISH_LABELS[test_score.description]
      end
    end
  end
else
  json.success false
  json.error @error
end
