json.success @success
if @success
	json.set! :result do 
		json.extract! @user, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :sponsor_iuvare_id, :placement_xango_id, :placement_iuvare_id, :xango_rank, :active, :downline_position
	end
else
  json.error @user.errors.messages[:email][0]
end
