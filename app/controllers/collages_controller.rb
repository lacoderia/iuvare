class CollagesController < ApplicationController

  respond_to :json

  def by_user
    @collages = Collage.includes(:collage_images).where(user_id: params[:user_id]).order("collage_images.order ASC")
    render "by_user.json"
  end

  private

    def collage_params
      params.require(:collage).permit(:user_id, :name, :order)
    end
end

