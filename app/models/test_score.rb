class TestScore < ActiveRecord::Base
  belongs_to :test
  belongs_to :user
  belongs_to :contact

  def self.grade_test user_id, test, answers, contact_id = nil

    user = User.find(user_id)

    if answers.uniq.count == test.questions.count and validate_answers(answers, test) 

      if test.test_type == "percentage"
        return grade_percentage_test answers, user, test
      elsif test.test_type == "correct_incorrect"
        return grade_correct_incorrect_test answers, user, test
      elsif test.test_type == "multiple"
        if not contact_id
          raise "Falta contact_id para este tipo de test"
        end
        contact = Contact.find(contact_id)        
        return grade_multiple_test answers, user, test, contact
      end
            
    else
      raise "El número de respuestas únicas no corresponde al número de las preguntas"
    end

  end

  private

    def self.grade_multiple_test answers, user, test, contact

      ts = nil
      answers.each do |answer|
        answer = Answer.find(answer["id"])
        ts = TestScore.find_or_initialize_by(user_id: user.id, test_id: test.id, contact_id: contact.id)
        if answer.text.to_i != 0
          ts.score = answer.text
        else
          ts.description = answer.text
        end
        ts.save!
        #Enviar Correo con respuestas
        IuvareMailer.send_answers(user, ts).deliver_now
      end

      return [ts]

    end

    def self.grade_percentage_test answers, user, test

      percentage_types_with_count = {}

      Test::PERCENTAGE_ANSWER_TYPES_BY_CODE[test.code].each do |answer_type|
        percentage_types_with_count[answer_type] = 0.0
      end

      total = answers.count

      answers.each do |answer|

        answer = Answer.find(answer["id"])
        percentage_types_with_count[answer.answer_type] += 1

      end

      test_scores = []
      percentage_types_with_count.each do |key, value|
        ts = TestScore.find_or_initialize_by(user_id: user.id, test_id: test.id, description: key)
        ts.score = (value/total*100).round(2)
        ts.save!
        test_scores << ts
      end

      return test_scores
    end

    def self.grade_correct_incorrect_test answers, user, test

      correct = 0.0
      total = answers.count

      answers.each do |answer|

        answer = Answer.find(answer["id"])
        correct += 1.0 if answer.answer_type == "correct"

      end

      ts = TestScore.find_or_initialize_by(user_id: user.id, test_id: test.id)
      ts.score = (correct/total*100).round(2)
      ts.save!

      return [ts] 

    end

    def self.validate_answers answers, test

      questions_array = []
      answers.each do |aa|
        questions_array << Answer.find(aa["id"]).question_id
      end

      test.questions.each do |question|
        if not questions_array.index(question.id)
          raise "Una pregunta del test no cuenta con su respuesta"
        end
      end

      return true
    end

end
