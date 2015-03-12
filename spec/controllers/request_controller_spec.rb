require 'rails_helper'

RSpec.describe RequestsController, :type => :request do
	subject{FactoryGirl.create(:request)}
	context 'premier logged in' do
		it 'get_pending_request' do
			request= FactoryGirl.build(:request, {user_id: 1, source_name:"alberto", source_email:"alberto.simonin@hotmail.com", source_text:"asdf", visible: true, request_state_id: 1})
			#request=create(:user)
			post "requests/1/get_pending.json"
			expect(response).to be_success
			requests = JSON.parse(response.body)
			expect(requests).not_to be_empty
			expect(requests[0]['id']).to eq(request.id)
		end
	end
end
