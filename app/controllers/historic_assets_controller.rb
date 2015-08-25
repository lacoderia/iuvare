class HistoricAssetsController < InheritedResources::Base

  private

    def historic_asset_params
      params.require(:historic_asset).permit(:description, :historic_asset_type)
    end
end

