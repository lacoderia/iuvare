module TestingSupport
  module DeviseHelpers

    def login_with_service user
      with_rack_test_driver do
        page.driver.post user_session_path, { user: user}
      end
      return page
    end

    def register_with_service user, token
      with_rack_test_driver do
        page.driver.post user_registration_path, { token: token, user: user}
      end
      return page
    end

    def logout
      visit(logout_path)
    end

    def get_session
      visit("/session.json")
      return page
    end

    def login_as_admin admin
      visit(new_admin_user_session_path)
      fill_in 'admin_user_email', with: admin.email
      fill_in 'admin_user_password', with: admin.password
      click_button 'Login'
    end

    def logout_as_admin
       visit(destroy_admin_user_session_path)
    end

  end
end
