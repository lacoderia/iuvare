json.success @success
if @success
  json.set! :result do 
		json.extract! @user, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :placement_xango_id, :xango_rank, :active, :downline_position, :picture, :payment_expiration, :upline_id
	end
else
  json.error @error
end
