json.success @success
if @success
	json.set! :result do 
		json.array!(@downlines) do |downline|
			json.extract! downline, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :sponsor_iuvare_id, :placement_xango_id, :placement_iuvare_id, :active, :payment_expiration, :xango_rank, :picture, :downline_position, :upline_id
		end
	end
else
	json.error @error
end