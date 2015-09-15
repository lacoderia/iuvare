#!/usr/bin/env ruby
require_relative "../config/environment"

CSV.foreach(File.path("audios.csv"), { :col_sep => '|' }) do |col|
  HistoricAsset.create(historic_asset_type: "audio", number: col[0], name: col[1], author: col[2], color: "purple")
end
