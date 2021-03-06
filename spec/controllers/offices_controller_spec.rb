feature 'OfficesController' do
  
  let!(:user){ create(:user) }
	
  describe 'offices' do

    context 'ordered_by_name' do

      let!(:office1){create(:office, name:"Morelia")}
      let!(:office2){create(:office, name:"Toluca")}
      let!(:office3){create(:office, name:"Big Ben")}

      it 'has sorted info' do

        login_with_service u = { email: user.email, password: '12345678' }
	visit "#{ordered_by_name_offices_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        result = response['result']
        expect(result[0]['id']).to eql office3.id
        expect(result[1]['id']).to eql office1.id
        expect(result[2]['id']).to eql office2.id

      end

    end

  end

end
