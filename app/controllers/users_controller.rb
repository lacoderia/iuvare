class UsersController < ApplicationController
  
  authorize_resource

  before_action :set_user, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token, only: [:update]

  respond_to :html

  def index
    @users = User.all
    respond_with(@users)
  end

  def show
    respond_with(@user)
  end

  def new
    @user = User.new
    respond_with(@user)
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    @user.save
    respond_with(@user)
  end

  def update
    if @user.iuvare_id == nil and User.where("iuvare_id = ?", user_params[:iuvare_id]).count >= 1
      @error = "Tu ID de IUVARE ya está siendo usado por alguien más, por favor escríbenos a contacto@iuvare.mx"
      render "update.json"
    else
      begin
        @user.update!(user_params)
        if user_params[:password]
          signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
          @csrf = form_authenticity_token
          sign_in(:user, @user)
        end
        render "update.json"
      rescue Exception => e
        @error = e.message
        render "update.json", status: 500
      end
    end
  end

  def destroy
    @user.destroy
    respond_with(@user)
  end

  def all
    #logica de current_user y filtrado de socios
    if current_user
      @downlines = User.all_downlines(current_user.id)
      @success = true
      render "downlines.json"
    else
      @success = false
      @error = not_signed_error
      render "downlines.json", status: 500
    end
  end

  def cycle
    #logica de current_user y filtrado de socios
    if current_user
      @downlines = User.cycle_downlines(current_user.id)
      @success = true
      render "downlines.json"
    else
      @success = false
      @error = not_signed_error
      render "downlines.json", status: 500
    end
  end

  def change_position
    if current_user
      @downline = User.change_position(params[:id], params[:position])
      @success = true
      render "change_position.json"
    else
      @success = false
      @error = not_signed_error
      render "change_position.json", status: 500
    end
  end

  def by_iuvare_id
     users = User.by_iuvare_id(params[:iuvare_id])
    if users.empty?
      @error = "No se encontró usuario con este ID de IUVARE"
      render "by_iuvare_id.json", status: 500
    elsif users.count > 1
      @error = "Hay varios usuarios asociados a ese ID de IUVARE, favor de escribirnos a contacto@iuvare.mx"
      render "by_iuvare_id.json", status: 500
    else
      @user = users.first
      render "by_iuvare_id.json"
    end
  end

  def progress
    if current_user
      @funnel = current_user.progress
      @success = true
      render "progress.json"
    else
      @success = false
      @error = not_signed_error
      render "progress.json", status: 500
    end    
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :placement_xango_id, :active, :payment_expiration, :xango_rank, :upline_id, :picture, :password , :password_confirmation)
    end

    def not_signed_error
      "Tu sesión es inválida o ya expiró. Vuelve a iniciar sesión e intenta de nuevo."
    end
end
