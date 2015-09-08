#!/usr/bin/env ruby
require_relative "../config/environment"

CSV.foreach(File.path("audios.csv"), { :col_sep => '|' }) do |col|
  #puts col[0]
end
