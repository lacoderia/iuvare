class InvitationsController < ApplicationController
  authorize_resource

  before_action :set_invitation, only: [:show, :edit, :update, :destroy]
  respond_to :js, :html, :json

  def send_contact
    @contact = params[:contact]
    begin
      IuvareMailer.send_contact(@contact).deliver_now
      @success = true
      if params[:callback]
        return render 'send_contact.js', callback: params[:callback]
      else
        return render 'send_contact.json'
      end
    rescue Exception => e
      @success = false
      @error = e.message
      render 'send_contact.json', status: 500
    end
  end

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
    begin
      @invitation = Invitation.new(invitation_params)
      @invitation.generate_invitation
      @success = true
      render 'create.json'
    rescue Exception => e
      @success = false
      @error = e.message
      render 'create.json', status: 500
    end
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
