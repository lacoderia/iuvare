class JoinRolesUsers < ActiveRecord::Migration
  def up
    create_table :roles_users, :id => false do |t|
      t.references :role, :user
    end
    add_foreign_key :roles_users, :users
    add_foreign_key :roles_users, :roles
  end

  def down
    drop_table :roles_users
  end
end
