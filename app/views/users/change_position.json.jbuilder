json.success @success
if @success
	json.set! :result do 
	json.extract! @downline, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :placement_xango_id, :active, :payment_expiration, :xango_rank, :picture, :downline_position, :upline_id, :picture
	end
else
	json.error @error
end
