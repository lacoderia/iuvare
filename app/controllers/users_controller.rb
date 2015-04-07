class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

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
    @user.update(user_params)
    respond_with(@user)
  end

  def destroy
    @user.destroy
    respond_with(@user)
  end

  def all
    #logica de current_user y filtrado de socios
    if current_user
      @success = true
      @downlines = User.all_downlines(current_user.id)
    else
      @success = false
      @error = not_signed_error
    end
    render "downlines.json"
  end

  def cycle
    #logica de current_user y filtrado de socios
    if current_user
      @success = true
      @downlines = User.cycle_downlines(current_user.id)
    else
      @success = false
      @error = not_signed_error
    end
    render "downlines.json"
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :xango_id, :iuvare_id, :sponsor_xango_id, :sponsor_iuvare_id, :placement_xango_id, :placement_iuvare_id, :active, :payment_expiration, :xango_rank)
    end

    def not_signed_error
      "Tu sesión es inválida o ya expiró. Vuelve a iniciar sesión e intenta de nuevo."
    end
end
