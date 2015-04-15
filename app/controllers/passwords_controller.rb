class PasswordsController < Devise::PasswordsController
  
  skip_before_filter :verify_authenticity_token, :only => [:create, :update]

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      @success = true
    else
      @success = false
      @error = "Mail was not sent."
    end
  end

  def update
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
      set_flash_message(:notice, flash_message) if is_flashing_format?
      @success = true
      render "update.json"
    else
      @success = false
      @error = resource.errors.full_messages
      render "update.json", status: 500
    end
  end

end
