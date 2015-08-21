json.success @success
if @success
  json.set! :result do 
                json.set! :access_level do
                  json.extract! @access_level, :valid_account, :message
                  if not @access_level[:valid_account]
                    json.set! :payment_options do
                      json.array! @access_level[:payment_options] do |po|
                        json.item_name po[:item_name]
                        json.custom po[:custom]
                        json.amount po[:amount]
                        json.shipping po[:shipping]
                      end
                    end
                  end
                end
		json.extract! @user, :id, :first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :placement_xango_id, :xango_rank, :active, :downline_position, :picture, :upline_id, :kit_bought
                if Time.zone.now < User::LAUNCHING_DATE
                  json.payment_expiration User::LAUNCHING_DATE
                else
                  json.payment_expiration @user.payment_expiration ? @user.payment_expiration : (@user.created_at + User::FREE_MONTHS.months)
                end
		json.downline_count @user.downlines.size
		if @user.test_scores.size > 0
			json.set! :test_scores do
				tests = @user.test_scores.group_by(&:test)
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
else
  json.error @error
end
