feature 'EventsController' do
  let(:starting_datetime) { Time.zone.parse('12 May 2015 13:00:00') }
  let!(:user){ create(:user) }
	
  describe 'events' do
      
    context 'current convention' do

      before do
        Timecop.freeze(starting_datetime)
      end
      
      let!(:currentConvention){create(:event, :convention, date: starting_datetime+3.months)}
      let!(:nextConvention){create(:event, :convention, date: starting_datetime+9.months)}

      it 'should get current convention' do
        
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{current_events_path}.json?event_type=convention"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql currentConvention.id

	Timecop.travel(Time.zone.local(2015, 9, 25, 13, 30, 0))

        visit "#{current_events_path}.json?event_type=convention"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql nextConvention.id
        
      end


      it 'should get no convention' do

        Timecop.travel(Time.zone.local(2016, 3, 5, 13, 30, 0))
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{current_events_path}.json?event_type=convention"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']).to eql nil

      end

    end

    context 'current seminar' do
		  
      before do
        Timecop.freeze(starting_datetime)
      end
      
      let!(:eventPast){create(:event, date: starting_datetime-1.month)}
      let!(:eventCurr){create(:event, date: starting_datetime)}
      let!(:eventNext){create(:event, date: starting_datetime+1.month)}


      it 'should get past seminar' do
			
	Timecop.travel(Time.zone.local(2015, 4, 25, 13, 30, 0))
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql eventPast.id

      end
			
      it 'should get current seminar' do
			
	Timecop.travel(Time.zone.local(2015, 5, 1, 13, 30, 0))
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql eventCurr.id

      end
			
      it 'should get next seminar' do
			
	Timecop.travel(Time.zone.local(2015, 6, 5, 13, 30, 0))
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result'][0]['id']).to eql eventNext.id

      end
			
      it 'should get no seminar' do
			
        Timecop.travel(Time.zone.local(2015, 7, 5, 13, 30, 0))
        login_with_service u = { email: user.email, password: '12345678' }
        
        visit "#{current_events_path}.json"

        response = JSON.parse(page.body)
        expect(response['success']).to be true
        expect(response['result']).to eql nil

      end

    end

  end

end
