feature 'ActiveAdmin' do

  let!(:admin) { create(:admin) }
  let!(:user) { create(:user) }

  describe 'admin login process' do

    it 'should login' do 
      login_as_admin admin

      visit(admin_admin_users_path)

      expect(current_path).to eql admin_admin_users_path

      logout_as_admin
      
      expect(current_path).to eql new_admin_user_session_path
    end

    it 'should not login' do
      login_as_admin user 
      
      expect(current_path).to eql new_admin_user_session_path
    end
    
  end
end
