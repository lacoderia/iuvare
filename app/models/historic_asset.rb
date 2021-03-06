class HistoricAsset < ActiveRecord::Base

  TYPES = [
    [ 'audio', 'audio'],
    [ 'book', 'libro']
  ]

  COLORS = [
    'yellow',
    'green',
    'blue',
    'red',
    'purple',
    'orange'
  ]

  validates :historic_asset_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }

  #validates :color, inclusion: {in: COLORS}, if: :audio_type?

  def audio_type?
    historic_asset_type == "audio"
  end

  def self.by_type historic_asset_type
    HistoricAsset.where("historic_asset_type = ? and active = ?", historic_asset_type, true)
  end

end
