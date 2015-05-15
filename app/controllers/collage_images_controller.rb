class CollageImagesController < InheritedResources::Base

  private

    def collage_image_params
      params.require(:collage_image).permit(:collage_id, :picture, :order)
    end
end

