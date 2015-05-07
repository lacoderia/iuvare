class PlansController <  ApplicationController
  before_action :set_plan, only: [:finish_video]

  respond_to :json

  def send_video
    begin
      @plan = Plan.send_video(params[:contact_id], params[:user_id], params[:asset_id])
    rescue Exception => e
      @error = e.message
    end
  end

  def finish_video
    begin
      @plan = Plan.finish_video(@plan)
    rescue Exception => e
      @error = e.message
    end
  end

  def watch_video
    begin
      token = params[:token]
      @plan = Plan.can_watch_video(token)
    rescue  Exception => e
      @error = e.message
    end
  end

  private

    def set_plan
      @plan = Plan.find(params[:id])
    end

    def plan_params
      params.require(:plan).permit(:asset_id, :contact_id, :token, :expiration, :description)
    end
end

