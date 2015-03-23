class RegistrationsController < Devise::RegistrationsController
  before_filter :update_sanitized_params, if: :devise_controller?

  def update_sanitized_params
    devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :sponsor_iuvare_id, :placement_xango_id, :placement_iuvare_id, :active, :payment_expiration, :xango_rank, :password, :password_confirmation)}
  end

	def create
		build_resource(sign_up_params)
		@user = resource
		saved = @user.register(params[:token])
		if saved
			sign_in @user
			@success = true
			render "create.json"
		else
			#binding.pry
			@success = false
			render "create.json", status: 500
		end
	end
end
