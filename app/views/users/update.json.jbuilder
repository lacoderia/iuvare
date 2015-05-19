if not @error
  json.success true
  json.set! :result do 
    json.extract! @user, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :sponsor_iuvare_id, :placement_xango_id, :placement_iuvare_id, :active, :payment_expiration, :xango_rank, :picture 
  end
else
  json.success false
  json.error @error
end
