class AddForeignKeysToUsersInvitationsRequests < ActiveRecord::Migration
  def change
    add_foreign_key :invitations, :users
    add_foreign_key :requests, :users
  end
end
