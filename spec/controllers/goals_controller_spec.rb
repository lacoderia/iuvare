feature 'GoalsController' do

  let!(:user){ create(:user) }

  describe 'goal associations' do


    it 'has correct associations' do

      visit "#{by_user_goals_path}.json?user_id=#{user.id}"
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      goals = response['result']['goals']
      expect(goals.empty?).to be true

      goal = FactoryGirl.create(:goal, user: user)

      visit "#{by_user_goals_path}.json?user_id=#{user.id}"
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      goals = response['result']['goals']
      expect(goals.count).to eql 1
      expect(goals[0]['user_id']).to eql user.id
      expect(Goal.by_user(user).type_be.count).to eql 1

    end


  end
  
  describe 'CRUD' do

    it 'should do create and update operations from services correctly' do

      new_goal_request = {goal:{dream: 'New Dream', goal: 'New Goal', date: "2015-04-04", user_id: user.id, goal_type: 'be'} }
      with_rack_test_driver do
        page.driver.post "#{goals_path}.json", new_goal_request
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      created_goal = Goal.find(response['result']['id'])

      other_goal_request = {goal:{dream: 'Other Dream', goal: 'Other Goal', date: "2015-04-04", user_id: user.id, goal_type: 'be'} }
      with_rack_test_driver do
        page.driver.post "#{goals_path}.json", other_goal_request
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be false 

      update_goal_request = {goal:{dream: "Changed Dream"} }
      with_rack_test_driver do
        page.driver.put "#{goals_path}/#{created_goal.id}.json", update_goal_request
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be true
      expect(response['result']['dream']).to eql "Changed Dream"

      have_goal = Goal.create({dream: 'Have Dream', goal: 'Have Goal', date: "2015-04-04", user_id: user.id, goal_type: 'have'})

      fail_update_goal_request = {goal:{goal_type: "have"} }
      with_rack_test_driver do
        page.driver.put "#{goals_path}/#{created_goal.id}.json", fail_update_goal_request
      end
      response = JSON.parse(page.body)
      expect(response['success']).to be false 

      expect(Goal.all.count).to eql 2
      

    end

  end

end
