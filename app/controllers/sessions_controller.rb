class SessionsController < Devise::SessionsController
  
  authorize_resource :class => false
  
  skip_before_action :verify_authenticity_token

  def create

    @user = User.find_by_email(params[:user][:email])
    if @user
        if (current_user)
          sign_out current_user
        end
        
    	if @user.valid_password?(params[:user][:password])
    		sign_in @user
    		success
    	else
    		error "El correo electrónico o la contraseña son incorrectos."
    	end
    else
    	error "El correo electrónico o la contraseña son incorrectos."
    end
  end

  def get
    if current_user
      @user = current_user
      success
    else
      @success = false
      error "No has iniciado sesión."
    end
  end

  def success
  	@success = true
        @access_level = User.validate_access(current_user)
  	render "create.json"
  end

  def error message
  	@success = false
  	@error = message
  	render "create.json", status: 500
  end

end
