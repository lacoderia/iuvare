class SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token

  def create

    @user = User.find_by_email(params[:user][:email])
    if @user
    	if @user.valid_password?(params[:user][:password])
    		sign_in @user
    		success
    	else
    		error
    	end
    else
    	error
    end
  end

  def get
    if current_user
      @success = true
      @user = current_user
    else
      @success = false
      @error = "No has iniciado sesión."
    end
    render "get.json"
  end

  def success
  	@success = true
  	render "create.json"
  end

  def error
  	@success = false
  	@error = "El correo electrónico o la contraseña son incorrectos."
  	render "create.json", status: 500
  end

end