feature 'EventsController' do
  let(:starting_datetime) { Time.zone.parse('12 May 2015 13:00:00') }
	
  describe 'events' do

    context 'current' do
		  
      before do
        Timecop.freeze(starting_datetime)
      end
      
      let!(:eventPast){create(:event, date: starting_datetime-1.month)}
      let!(:eventCurr){create(:event, date: starting_datetime)}
      let!(:eventNext){create(:event, date: starting_datetime+1.month)}

      it 'should get past event' do
			
	Timecop.travel(Time.zone.local(2015, 4, 25, 13, 30, 0))
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql eventPast.id

      end
			
      it 'should get current event' do
			
	Timecop.travel(Time.zone.local(2015, 5, 1, 13, 30, 0))
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql eventCurr.id

      end
			
      it 'should get next event' do
			
	Timecop.travel(Time.zone.local(2015, 6, 5, 13, 30, 0))
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql eventNext.id

      end
			
      it 'should get no events' do
			
        Timecop.travel(Time.zone.local(2015, 7, 5, 13, 30, 0))
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']).to eql nil

      end

    end

  end

end
