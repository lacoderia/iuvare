class AddMoreInfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :phone, :string
    add_column :users, :address, :string
  end
end
