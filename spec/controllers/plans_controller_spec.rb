feature 'PlansController' do

  let(:starting_datetime) { Time.zone.parse('01 Jan 2015 13:00:00') }  
  let!(:user){ create(:user) }
  let!(:contact){ create(:contact, user: user, name: "Imperium") }
  let!(:asset){ create(:asset, :plan) }

  describe 'sending and watching video flow' do    

    before do
      Timecop.freeze(starting_datetime)
    end

    context 'send_video, watch_video, finish_video' do

      it 'should complete the video flow' do
      
        mail_count = ActionMailer::Base.deliveries.count
        login_with_service u = { email: user.email, password: '12345678' }
        
        #Sending video
        send_video_request = {contact_id: contact.id, user_id: user.id, asset_id: asset.id}
        with_rack_test_driver do
          page.driver.post "#{send_video_plans_path}.json", send_video_request
        end
        response = JSON.parse(page.body)

        expect(response['success']).to be true
        plan_object = response['result']
        expect(plan_object['asset_id']).to be asset.id
        expect(Time.zone.parse(plan_object['expiration'])).to eql (starting_datetime + 120.minutes)
        contact_object = plan_object['contact']
        expect(contact_object['status']).to eql 'contacted'

        # Sending video to him again
        send_video_request = {contact_id: contact.id, user_id: user.id, asset_id: asset.id}
        with_rack_test_driver do
          page.driver.post "#{send_video_plans_path}.json", send_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        plan_object = response['result']
        expect(plan_object['contact']['status']).to eql 'contacted'
        expect(mail_count + 2).to eql ActionMailer::Base.deliveries.count
        logout

        #Validating that video can be seen
        can_watch_video_request = {token: plan_object['token']}
        with_rack_test_driver do
          page.driver.post "#{watch_video_plans_path}.json", can_watch_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        plan_object = response['result']
        expect(plan_object['asset']['stream_url']).to eql "/stream?asset_type=#{asset.asset_type}&source=#{asset.source}"

        login_with_service u = { email: user.email, password: '12345678' }
        # Sending video to him again because he missed it
        send_video_request = {contact_id: contact.id, user_id: user.id, asset_id: asset.id}
        with_rack_test_driver do
          page.driver.post "#{send_video_plans_path}.json", send_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        plan_object = response['result']
        expect(plan_object['contact']['status']).to eql 'contacted'
        expect(mail_count + 3).to eql ActionMailer::Base.deliveries.count 
        logout

        #Finishing video
        visit "#{finish_video_plan_path(plan_object['id'])}.json"
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        updated_contact_object = response['result']['contact']
        expect(updated_contact_object['status']).to eql 'to_close'  

        login_with_service u = { email: user.email, password: '12345678' }
        # Sending video to him again because he requested it
        send_video_request = {contact_id: contact.id, user_id: user.id, asset_id: asset.id}
        with_rack_test_driver do
          page.driver.post "#{send_video_plans_path}.json", send_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        plan_object = response['result']
        expect(plan_object['contact']['status']).to eql 'to_close'
        expect(mail_count + 4).to eql ActionMailer::Base.deliveries.count
        
      end

    end 


    context 'send_video, watch_video, finish_video errors' do

      let!(:plan){ create(:plan) }
      
       it 'should send erros on video flow' do
        login_with_service u = { email: user.email, password: '12345678' }

        mail_count = ActionMailer::Base.deliveries.count
        #Sending video
        send_video_request = {contact_id: contact.id, user_id: user.id}
        with_rack_test_driver do
          page.driver.post "#{send_video_plans_path}.json", send_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be false

        send_video_request = {contact_id: contact.id, user_id: user.id, asset_id: asset.id}
        with_rack_test_driver do
          page.driver.post "#{send_video_plans_path}.json", send_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true
        plan_object = response['result']
        expect(mail_count + 1).to eql ActionMailer::Base.deliveries.count
        logout
        
        #Validating expiration time for video
        Timecop.travel(starting_datetime + 121.minutes)
        can_watch_video_request = {token: plan_object['token']}
        with_rack_test_driver do
          page.driver.post "#{watch_video_plans_path}.json", can_watch_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be false 
        expect(response['error']).to eql "Ya han pasado más de 120 minutos desde que se realizó la invitación"

        Timecop.travel(starting_datetime - 120.minutes)
        can_watch_video_request = {token: plan_object['token']}
        with_rack_test_driver do
          page.driver.post "#{watch_video_plans_path}.json", can_watch_video_request
        end
        response = JSON.parse(page.body)
        expect(response['success']).to be true       
        
        #Finishing video
        visit "#{finish_video_plan_path(plan.id)}.json"
        response = JSON.parse(page.body)
        expect(response['success']).to be false 

      end

    end
 
  end

end
