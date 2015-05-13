feature 'OfficesController' do
	
	describe 'offices' do

		context 'check office information' do
			let!(:office1){create(:office, title:"Morelia")}
			let!(:office2){create(:office, title:"Toluca")}
			let!(:office3){create(:office, title:"Big Ben")}

			it 'has correct info' do

				visit "#{by_name_offices_path}.json"

        response = JSON.parse(page.body)
        expect(response).not_to be nil
        expect(response[0]['id']).to eql office3.id
        expect(response[1]['id']).to eql office1.id
        expect(response[2]['id']).to eql office2.id

			end

		end

	end

end
