class HistoricAssetsController < InheritedResources::Base

  authorize_resource

  def by_type
    historic_asset_type = params[:historic_asset_type]

    @historic_assets = HistoricAsset.by_type(historic_asset_type)
  end

  private

    def historic_asset_params
      params.require(:historic_asset).permit(:description, :historic_asset_type)
    end
end

