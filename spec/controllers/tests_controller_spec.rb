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
      expect(first_question_answers.first['answer_type']).to eql "red"
    end

  end

end
