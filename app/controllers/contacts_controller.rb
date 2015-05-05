class ContactsController < ApplicationController 
  before_action :set_contact, only: [:update, :destroy]

  respond_to :json

  def create
    @contact = Contact.new(contact_params)
    begin
      @contact.save!
      render "create.json"
    rescue Exception => e
      @errors = e.message
      render "create.json", status: 500      
    end
  end

  def update
    begin
      @contact.update_attributes(contact_params)
      render "update.json"
    rescue Exception => e
      @errors = e.message
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

  private

    def set_contact
      @contact = Contact.find(params[:id])
    end

    def contact_params
      params.require(:contact).permit(:user_id, :name, :email, :phone, :description, :status)
    end
end
