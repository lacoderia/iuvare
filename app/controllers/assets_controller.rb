class AssetsController < ApplicationController

  respond_to :json

  def by_keyword_and_asset_type
    keyword = params[:keyword].downcase
    asset_type = params[:asset_type]
    @assets = Asset.where("asset_type = ? AND (LOWER(title) like '%#{keyword}%' OR LOWER(description) like '%#{keyword}%' OR LOWER(author) like '%#{keyword}%')", asset_type)
  end

  def by_asset_type
    asset_type = params[:asset_type]
    @assets = Asset.where(asset_type: asset_type)
  end

  private

    def asset_params
      params.require(:asset).permit(:title, :description, :author, :source, :purchasable, :price, :asset_type)
    end
end

