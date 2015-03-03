class RequestStatesController < ApplicationController
  before_action :set_request_state, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @request_states = RequestState.all
    respond_with(@request_states)
  end

  def show
    respond_with(@request_state)
  end

  def new
    @request_state = RequestState.new
    respond_with(@request_state)
  end

  def edit
  end

  def create
    @request_state = RequestState.new(request_state_params)
    @request_state.save
    respond_with(@request_state)
  end

  def update
    @request_state.update(request_state_params)
    respond_with(@request_state)
  end

  def destroy
    @request_state.destroy
    respond_with(@request_state)
  end

  private
    def set_request_state
      @request_state = RequestState.find(params[:id])
    end

    def request_state_params
      params.require(:request_state).permit(:name)
    end
end
