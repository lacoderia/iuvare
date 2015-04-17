feature 'ActiveAdmin' do

  let!(:premier) { create(:premier) }
  let!(:user) { create(:user) }

  describe 'premier login process' do

    it 'should login' do 
      login_as_admin premier 

      visit(admin_solicitudes_de_accesos_path)

      expect(current_path).to eql admin_solicitudes_de_accesos_path

      logout_as_admin
      
      expect(current_path).to eql new_premier_session_path
    end

    it 'should not login' do
      login_as_admin user 
      
      expect(current_path).to eql new_premier_session_path
    end
    
  end
end
