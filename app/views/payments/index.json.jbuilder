json.array!(@payments) do |payment|
  json.extract! payment, :id, :user_id, :paypal_trans_id, :amount, :payment_type
  json.url payment_url(payment, format: :json)
end
