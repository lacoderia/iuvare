#!/usr/bin/env ruby
require_relative "../config/environment"

number = 1

CSV.foreach(File.path("books.csv"), { :col_sep => '|' }) do |col|
  HistoricAsset.create(historic_asset_type: "book", number: number , name: col[0], author: col[1])
  number += 1
end
