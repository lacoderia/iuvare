class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :xango_id
      t.string :iuvare_id
      t.string :sponsor_xango_id
      t.string :sponsor_iuvare_id
      t.string :placement_xango_id
      t.string :placement_iuvare_id
      t.boolean :active
      t.datetime :payment_expiration
      t.string :xango_rank

      t.timestamps
    end
  end
end
