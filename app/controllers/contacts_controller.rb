class ContactsController < ApplicationController 
  before_action :set_contact, only: [:update, :destroy, :send_video, :finish_video]

  respond_to :json

  def create
    @contact = Contact.new(contact_params)
    begin
      @contact.save!
      render "create.json"
    rescue Exception => e
      @errors = e
      render "create.json", status: 500      
    end
  end

  def update
    begin
      @contact.update_attributes(contact_params)
      render "update.json"
    rescue Exception => e
      @errors = e
      render "update.json", status: 500
    end
  end

  def destroy
    @contact.destroy
    respond_with(@contact)
  end

  def by_user
    @contact = Contact.where(user_id: params[:user_id])
    render "by_user.json"
  end

  def send_video
    #TODO: SEND VIDEO LOGIC
    @contact.invite!
  end

  def finish_video
    # TODO: FINISH VIDEO LOGIC
    @contact.watch_video!
  end

  private

    def set_contact
      @contact = Contact.find(params[:id])
    end

    def contact_params
      params.require(:contact).permit(:user_id, :name, :email, :phone, :description, :status)
    end
end

