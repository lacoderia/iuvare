class PlansController < InheritedResources::Base

  private

    def plan_params
      params.require(:plan).permit(:asset_id, :contact_id, :token, :expiration, :description)
    end
end

