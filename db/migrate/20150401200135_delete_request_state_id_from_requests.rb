class DeleteRequestStateIdFromRequests < ActiveRecord::Migration
  def change
  	remove_column :requests, :request_state_id
  end
end
