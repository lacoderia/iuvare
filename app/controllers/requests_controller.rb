class RequestsController < ApplicationController
  
  authorize_resource 
  
  before_action :set_request, only: [:show, :edit, :update, :destroy]

  respond_to :html, :json

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
    @request.create_request
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

  def accept
    @request = Request.find(params[:id])
    @request.accept_request
    render "change_status.json"
  end

  def reject
    @request = Request.find(params[:id])
    @request.reject_request
    render "change_status.json"
  end

  private
    def set_request
      @request = Request.find(params[:id])
    end

    def request_params
      params.require(:request).permit(:source_name, :source_email, :source_text, :user_id, :visible, :status)
    end
end
