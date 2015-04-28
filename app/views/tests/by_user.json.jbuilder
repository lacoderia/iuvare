if not @tests.empty?
  json.success true
  json.set! :result do
    json.set! :tests do
      json.array! (@tests) do |test|
        json.extract! test, :id, :name, :test_type, :code
        json.set! :test_scores do
          json.array! (test.test_scores) do |test_score|
            json.extract! test_score, :id, :user_id, :score, :description
          end
        end
      end
    end
  end
else
  json.success true 
  json.set! :result do
    json.nil!    
  end
end
