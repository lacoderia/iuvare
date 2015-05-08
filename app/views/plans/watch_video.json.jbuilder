if @plan
  json.success true
  json.set! :result do
    json.extract! @plan, :id, :token, :expiration, :description
    json.set! :contact do
      json.extract! @plan.contact, :id, :user_id, :name, :email, :phone, :description, :status
    end
    json.set! :asset do
      json.extract! @plan.asset, :id, :title, :description, :author, :source, :purchasable, :price, :asset_type
      json.set! :test do
        json.extract! @plan.asset.test, :id, :name, :test_type
        json.set! :questions do
          json.array! (@plan.asset.test.questions) do |question|
            json.extract! question, :id, :test_id, :text
            json.set! :answers do
              json.array! (question.answers) do |answer|
                json.extract! answer, :id, :question_id, :text
              end
            end
          end
        end
      end
    end
  end
else
  json.success false 
  json.error @error
end
