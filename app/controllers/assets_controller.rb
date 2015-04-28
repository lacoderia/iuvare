class AssetsController < InheritedResources::Base

  private

    def asset_params
      params.require(:asset).permit(:title, :description, :author, :source, :purchasable, :price, :asset_type)
    end
end

