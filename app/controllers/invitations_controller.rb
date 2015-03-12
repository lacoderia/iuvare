class InvitationsController < ApplicationController
  before_action :set_invitation, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @invitations = Invitation.all
    respond_with(@invitations)
  end

  def show
    respond_with(@invitation)
  end

  def new
    @invitation = Invitation.new
    respond_with(@invitation)
  end

  def edit
  end

  def create
    @invitation = Invitation.new(invitation_params)
    @invitation.save
    respond_with(@invitation)
  end

  def update
    @invitation.update(invitation_params)
    respond_with(@invitation)
  end

  def destroy
    @invitation.destroy
    respond_with(@invitation)
  end

  #send invitation for new users
  #recibe:
  #user_id: id del usuario que envía la invitación
  #recipient_name: nombre de quien recibe la invitación
  #recipient_email: email a donde se envía la invitación
  def send
    Invitation.send(user_id: @user.id, recipient_name: params[:recipient_name], recipient_email: params[:recipient_email])
  end

  private
    def set_invitation
      @invitation = Invitation.find(params[:id])
    end

    def invitation_params
      params.require(:invitation).permit(:user_id, :recipient_name, :recipient_email, :token)
    end
end
