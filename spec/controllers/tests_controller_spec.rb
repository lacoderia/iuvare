feature 'TestsController' do

  let!(:user){ create(:user) }

  # Personality test
  let!(:personality_test){create(:test, name: "Test de personalidad", test_type: "percentage", code: "color")}

  let!(:pt_first_question){ create(:question, test: personality_test, text: "Debilidades") }
  let!(:fq_answer_1){ create(:answer, question: pt_first_question, text: "Superficial", answer_type: "red")}
  let!(:fq_answer_2){ create(:answer, question: pt_first_question, text: "Penoso", answer_type: "blue") }
  let!(:fq_answer_3){ create(:answer, question: pt_first_question, text: "Evades", answer_type: "green") }
  let!(:fq_answer_4){ create(:answer, question: pt_first_question, text: "Mandón", answer_type: "yellow") }
  
  let!(:pt_second_question){ create(:question, test: personality_test, text: "Debilidades") }
  let!(:sq_answer_1){ create(:answer, question: pt_second_question, text: "Sientes orgullo de ti", answer_type: "yellow") }
  let!(:sq_answer_2){ create(:answer, question: pt_second_question, text: "Simple", answer_type: "blue") }
  let!(:sq_answer_3){ create(:answer, question: pt_second_question, text: "Pesimista", answer_type: "green") }
  let!(:sq_answer_4){ create(:answer, question: pt_second_question, text: "Permisivo", answer_type: "red") }

  # Module test
  let!(:module1_test){ create(:test, name: "Módulo uno", test_type: "correct_incorrect", code: "module_1") }

  let(:m1_first_question){create(:question, test: module1_test, text: "¿De cuántas personas es recomendable hacer la lista de prospectos?")}
  let!(:tq_answer_1){ create(:answer, question: m1_first_question, text: "de los más posibles", answer_type: "incorrect") }
  let!(:tq_answer_2){ create(:answer, question: m1_first_question, text: "de 15", answer_type: "incorrect") }
  let!(:tq_answer_3){ create(:answer, question: m1_first_question, text: "de más de 25", answer_type: "incorrect") }
  let!(:tq_answer_4){ create(:answer, question: m1_first_question, text: "de 100 por lo menos", answer_type: "correct") }
  
  let(:m1_second_question){create(:question, test: module1_test, text: "¿De dónde debo obtener mi lista de prospectos?")}
  let!(:cq_answer_1){ create(:answer, question: m1_second_question, text: "de mi círculo de influencia", answer_type: "correct") }
  let!(:cq_answer_2){ create(:answer, question: m1_second_question, text: "de crear una página web", answer_type: "incorrect") }
  let!(:cq_answer_3){ create(:answer, question: m1_second_question, text: "mi patrocinador me la dará", answer_type: "incorrect") }
  let!(:cq_answer_4){ create(:answer, question: m1_second_question, text: "de poner anuncios en periódicos y bolsas de trabajo", answer_type: "incorrect") }

  let(:m1_third_question){create(:question, test: module1_test, text: "¿Qué es lo mas importante que tienes que saber para tener éxito?")}
  let!(:qq_answer_1){ create(:answer, question: m1_third_question, text: "Conocer perfectamente el plan de negocios", answer_type: "incorrect") }
  let!(:qq_answer_2){ create(:answer, question: m1_third_question, text: "Conocer perfectamente el jugo", answer_type: "incorrect") }
  let!(:qq_answer_3){ create(:answer, question: m1_third_question, text: "Conocer al prospecto", answer_type: "correct") }


  describe 'GET tests' do

    it 'gets correctly questions and answers by code' do

      with_rack_test_driver do
        page.driver.post "/tests/by_code.json", { code: "color"}
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      
      color_test = response['result']
      expect(color_test['questions'].count).to eql 2

      first_question_answers = color_test['questions'].first['answers']
      expect(first_question_answers.count).to eql 4
      expect(first_question_answers.first['text']).to eql "Superficial"


      with_rack_test_driver do
        page.driver.post "/tests/by_code.json", { code: "module_1"}
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      
      module_test = response['result']
      expect(module_test['questions'].count).to eql 3

      last_question_answers = module_test['questions'].last['answers']
      expect(last_question_answers.count).to eql 3
      expect(last_question_answers.first['text']).to eql "Conocer perfectamente el plan de negocios"

      with_rack_test_driver do
        page.driver.post "/tests/by_code.json", { code: "ABC"}
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be false
      expect(response['error']).to eql "No se encontró el test"
    end

  end

  describe 'Evaluate percentage test_type' do

    it 'evaluates correctly questions and answers' do

      answers = [{id: fq_answer_1.id}, {id: sq_answer_1.id}]
      with_rack_test_driver do
        page.driver.post "/test_scores/grade_test.json", { user_id: user.id, test_code: personality_test.code, answers: answers}
      end

      response = JSON.parse(page.body)
      expect(response['success']).to be true
      expect(response['result']['id']).to eql personality_test.id
      test_scores = response['result']['test_scores']
      
      expect(test_scores.count).to eql 4
      yellow = test_scores.select{|ts| ts['description'] == "yellow"}[0]
      expect(yellow["score"]).to eql 50.0
      red = test_scores.select{|ts| ts['description'] == "red"}[0]
      expect(red["score"]).to eql 50.0

      answers = [{id: fq_answer_2.id}, {id: sq_answer_2.id}]
      with_rack_test_driver do
        page.driver.post "/test_scores/grade_test.json", { user_id: user.id, test_code: personality_test.code, answers: answers}
      end

      response = JSON.parse(page.body)
      expect(response['success']).to be true
      expect(response['result']['id']).to eql personality_test.id
      test_scores = response['result']['test_scores']
      
      expect(test_scores.count).to eql 4
      blue = test_scores.select{|ts| ts['description'] == "blue"}[0]
      expect(blue["score"]).to eql 100.0 

      with_rack_test_driver do
        page.driver.post "/tests/by_code_and_user.json", { user_id: user.id, test_code: personality_test.code}
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      test = response['result']
      expect(test['code']).to eql personality_test.code
      expect(test['test_scores'].count).to eql Test::PERCENTAGE_ANSWER_TYPES_BY_CODE[personality_test.code].count
      expect(test['test_scores'].select{ |s| s['description'] == 'blue'}.first['score']).to eql 100.0

      with_rack_test_driver do
        page.driver.post "/tests/by_code_and_user.json", { user_id: user.id, test_code: "ABC"}
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be false 
      expect(response['error']).to eql "No se encontró el test con ese usuario"

    end
        
  end

  describe 'Evaluate correct_incorrect test_type' do

    it 'evaluates correctly questions and answers' do

      answers = [{id: tq_answer_1.id}, {id: cq_answer_1.id}, {id: qq_answer_1.id}]
      with_rack_test_driver do
        page.driver.post "/test_scores/grade_test.json", { user_id: user.id, test_code: module1_test.code, answers: answers}
      end

      response = JSON.parse(page.body)
      expect(response['success']).to be true
      expect(response['result']['id']).to eql module1_test.id
      test_scores = response['result']['test_scores']

      expect(test_scores.count).to eql 1
      ts = test_scores.first
      expect(ts["score"]).to eql 33.33

      answers = [{id: tq_answer_4.id}, {id: cq_answer_1.id}, {id: qq_answer_3.id}]      
      with_rack_test_driver do
        page.driver.post "/test_scores/grade_test.json", { user_id: user.id, test_code: module1_test.code, answers: answers}
      end

      response = JSON.parse(page.body)
      expect(response['success']).to be true
      expect(response['result']['id']).to eql module1_test.id
      test_scores = response['result']['test_scores']

      expect(test_scores.count).to eql 1
      ts = test_scores.first
      expect(ts["score"]).to eql 100.0

      visit("/tests/by_user.json?user_id=#{user.id}")
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      tests = response['result']['tests']
      expect(tests.first['code']).to eql module1_test.code

      expect(tests.first['test_scores'].count).to eql 1
      expect(tests.first['test_scores'].first['score']).to eql 100.0
          
    end

  end

  describe 'error handling' do

    it 'should raise errors for test questions without answers' do
      answers = [{id: fq_answer_1.id}, {id: fq_answer_2.id}]
      with_rack_test_driver do
        page.driver.post "/test_scores/grade_test.json", { user_id: user.id, test_code: personality_test.code, answers: answers}
      end

      expect(page.status_code).to be 500
      response = JSON.parse(page.body)
      expect(response['success']).to be false
      expect(response['error']).to eql "Una pregunta del test no cuenta con su respuesta"
    end

    it 'should raise errors for different number of questions and answers submited for test' do
      answers = [{id: tq_answer_1.id}, {id: cq_answer_1.id}]
      with_rack_test_driver do
        page.driver.post "/test_scores/grade_test.json", { user_id: user.id, test_code: module1_test.code, answers: answers}
      end

      response = JSON.parse(page.body)
      expect(response['success']).to be false
      expect(response['error']).to eql "El número de respuestas únicas no corresponde al número de las preguntas"
    end

  end

end
