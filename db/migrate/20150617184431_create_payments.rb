class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.integer :user_id
      t.string :paypal_trans_id
      t.float :amount
      t.string :payment_type

      t.timestamps null: false
    end
    add_foreign_key :payments, :users
    
    add_index "payments", "paypal_trans_id", name: "index_payments_on_paypal_trans_id", unique: true, using: :btree
  end
end
