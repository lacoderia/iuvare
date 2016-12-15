class AssetsController < ApplicationController
  
  authorize_resource 

  respond_to :json

  def by_keyword_and_asset_type
    keyword = params[:keyword].downcase
    asset_type = params[:asset_type]
    @assets = Asset.by_keyword(keyword).by_asset_type(asset_type)
  end

  def by_asset_type
    asset_type = params[:asset_type]
    @assets = Asset.by_asset_type(asset_type)
  end

  def stream
    stream_params = Asset.stream_file params[:asset_type], params[:source]
    
    send_file stream_params[0],
      filename: File.basename(stream_params[0]),
      type: Mime::Type.lookup_by_extension(stream_params[1]),
      disposition: 'inline',
      stream: true,
      buffer_size: 4096

  end

  private

    def asset_params
      params.require(:asset).permit(:title, :description, :author, :source, :purchasable, :price, :asset_type)
    end
end

