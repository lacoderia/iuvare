class InvitationsController < ApplicationController
  before_action :set_invitation, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token
  respond_to :html, :json

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
    @invitation.generate_invitation
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

  private
    def set_invitation
      @invitation = Invitation.find(params[:id])
    end

    def invitation_params
      params.require(:invitation).permit(:user_id, :recipient_name, :recipient_email, :token)
    end
end
