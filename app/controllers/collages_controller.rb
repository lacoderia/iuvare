class CollagesController < InheritedResources::Base

  private

    def collage_params
      params.require(:collage).permit(:user_id, :name, :order)
    end
end

