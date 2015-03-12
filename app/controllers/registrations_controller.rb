class RegistrationsController < Devise::RegistrationsController
	before_filter :update_sanitized_params, if: :devise_controller?
	skip_before_filter :verify_authenticity_token, :only => [:create]
	respond_to :json

	def update_sanitized_params
    devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :sponsor_iuvare_id, :placement_xango_id, :placement_iuvare_id, :active, :payment_expiration, :xango_rank, :password, :password_confirmation)}
    #devise_parameter_sanitizer.for(:account_update) {|u| u.permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)}
  end

	def create
		build_resource(sign_up_params)
		@user = resource
		saved = @user.register(params[:token])
		puts '--------------------------- '+saved.to_s
		if saved
			@success = true
		else
			binding.pry
			@success = false
		end
	end

end