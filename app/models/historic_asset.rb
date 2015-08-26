class HistoricAsset < ActiveRecord::Base

  TYPES = [
    [ 'audio', 'audio'],
    [ 'book', 'libro']
  ]

  validates :historic_asset_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }

  def self.by_type historic_asset_type
    HistoricAsset.where("historic_asset_type = ?", historic_asset_type)
  end

end
