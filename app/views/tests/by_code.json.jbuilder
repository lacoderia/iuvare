if @test
  json.success true
  json.set! :result do
    json.extract! @test, :id, :name, :test_type, :code, :instructions
    json.set! :questions do
      if @test.code == "color"
        questions = @test.questions.shuffle
      else
        questions = @test.questions
      end
        json.array! (questions) do |question|
        json.extract! question, :id, :test_id, :text
        json.set! :answers do
          if @test.code == "color"
            answers = question.answers.shuffle
          else
            answers = question.answers
          end
          json.array! (answers) do |answer|
            json.extract! answer, :id, :question_id, :text
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
