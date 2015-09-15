#!/usr/bin/env ruby
require_relative "../config/environment"

CSV.foreach(File.path("books.csv"), { :col_sep => '|' }) do |col|
  HistoricAsset.create(historic_asset_type: "book", number: col[0], name: col[1], author: col[2])
end
