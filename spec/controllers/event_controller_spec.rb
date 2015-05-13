feature 'EventsController' do
	
	describe 'events' do

		context 'current' do
			let!(:eventPast){create(:event, date: Date.today-1.month)}
			let!(:eventCurr){create(:event)}
			let!(:eventNext){create(:event, date: Date.today+1.month)}

			it 'should get past event' do
			
			  Timecop.travel(Time.zone.local(2015, 4, 25, 13, 30, 0))
          visit "#{current_events_path}.json"

          response = JSON.parse(page.body)
          expect(response['success']).to be true
          expect(response['result'][0]['id']).to eql 1

			end
			
			it 'should get current event' do
			
			  Timecop.travel(Time.zone.local(2015, 5, 12, 13, 30, 0))
          visit "#{current_events_path}.json"

          response = JSON.parse(page.body)
          expect(response['success']).to be true
          expect(response['result'][0]['id']).to eql 5

			end
			
			it 'should get next event' do
			
			  Timecop.travel(Time.zone.local(2015, 6, 5, 13, 30, 0))
          visit "#{current_events_path}.json"

          response = JSON.parse(page.body)
          expect(response['success']).to be true
          expect(response['result'][0]['id']).to eql 9

			end

		end

	end

end
