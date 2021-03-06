json.array!(@users) do |user|
  json.extract! user, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :sponsor_iuvare_id, :placement_xango_id, :placement_iuvare_id, :active, :payment_expiration, :xango_rank
  json.url user_url(user, format: :json)
end
