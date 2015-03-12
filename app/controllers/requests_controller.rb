class RequestsController < ApplicationController
  before_action :set_request, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @requests = Request.all
    respond_with(@requests)
  end

  def show
    respond_with(@request)
  end

  def new
    @request = Request.new
    respond_with(@request)
  end

  def edit
  end

  def create
    @request = Request.new(request_params)
    @request.save
    respond_with(@request)
  end

  def update
    @request.update(request_params)
    respond_with(@request)
  end

  def destroy
    @request.destroy
    respond_with(@request)
  end

  #Recupera las solicitudes pendientes de un premier
  #Recibe:
  #user_id: ID del premier a quien se le solicita acceso
  def get_pending
    Request.get_pending(params[:user_id])
  end

  private
    def set_request
      @request = Request.find(params[:id])
    end

    def request_params
      params.require(:request).permit(:source_name, :source_email, :source_text, :user_id, :visible, :request_state_id)
    end
end
