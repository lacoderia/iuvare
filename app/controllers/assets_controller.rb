class AssetsController < ApplicationController

  respond_to :json

  def by_keyword_and_asset_type
    keyword = params[:keyword].downcase
    asset_type = params[:asset_type]
    @assets = Asset.by_asset_type(asset_type).by_keyword(keyword)
  end

  def by_asset_type
    asset_type = params[:asset_type]
    @assets = Asset.by_asset_type(asset_type)
  end

  def stream
    
    filepath = params[:source]

    video_extension = File.extname(filepath)[1..-1]

    send_file filepath,
      filename: File.basename(filepath),
      type: Mime::Type.lookup_by_extension(video_extension),
      disposition: 'inline',
      stream: true,
      buffer_size: 4096
    
  end

  private

    def asset_params
      params.require(:asset).permit(:title, :description, :author, :source, :purchasable, :price, :asset_type)
    end
end

