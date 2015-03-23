module TestingSupport
  module DeviseHelpers
    
   def login_as(user)
      visit(new_user_session_path)
      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'Log in'
    end

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
  end
end
