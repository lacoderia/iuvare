json.success @success
if @success
	json.set! :result do 
		json.array!(@downlines) do |downline|
			json.extract! downline, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :placement_xango_id, :active, :payment_expiration, :xango_rank, :picture, :downline_position, :upline_id
			json.downline_count downline.downlines.size
			if downline.test_scores.size > 0
				json.set! :test_scores do
					tests = downline.test_scores.group_by(&:test)
					json.array! (tests.keys) do |key|
						json.name key.name
						json.code key.code
						json.set! :scores do
							json.array! (tests[key]) do |test_score|
								json.extract! test_score, :score, :description
        				json.description_spanish Test::SPANISH_LABELS[test_score.description]
							end
						end
					end
				end
			end
		end
	end
else
	json.error @error
end