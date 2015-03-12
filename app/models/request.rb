class Request < ActiveRecord::Base
	
	def self.get_pending(user_id)
		state = RequestState.where(name: "pending")
		@request_list = Request.where("user_id = ? and request_state_id = ? and visible = ?", user_id, state[0].id, true)
	end
end
