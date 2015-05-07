feature 'PlansController' do

  let(:starting_datetime) { Time.zone.parse('01 Jan 2015 13:00:00') }  
  let!(:user){ create(:user) }
  let!(:contact){ create(:contact, user: user, name: "Imperium") }
  let!(:asset){ create(:asset, :plan) }

  describe 'sending and watching video flow' do    

    before do
      Timecop.freeze(starting_datetime)
    end

    it 'should complete the video flow' do
      
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

      #Validating that video can be seen
      can_watch_video_request = {token: plan_object['token']}
      with_rack_test_driver do
        page.driver.post "#{watch_video_plans_path}.json", can_watch_video_request
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      plan_object = response['result']

      #Finishing video
      visit "#{finish_video_plan_path(plan_object['id'])}.json"
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      updated_contact_object = response['result']['contact']
      expect(updated_contact_object['status']).to eql 'to_close'      
      
    end

  end

end
