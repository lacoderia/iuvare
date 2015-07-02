class CollageImagesController < ApplicationController
  
  authorize_resource 
  
  before_action :set_collage_image, only: [:destroy]

  respond_to :json

  def create_by_user_id
    begin
      @collage_image = CollageImage.create_by_user_id params[:picture], params[:user_id], params[:order]
      render "create_by_user_id.json"
    rescue Exception => e
      @error = e.message
      render "create_by_user_id.json", status: 500
    end
  end

  def destroy
    @collage_image.destroy
    respond_with(@collage_image)
  end
  
  private

    def set_collage_image
      @collage_image = CollageImage.find(params[:id])
    end

    def collage_image_params
      params.require(:collage_image).permit(:collage_id, :picture, :order)
    end
end
