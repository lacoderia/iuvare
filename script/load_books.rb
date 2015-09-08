#!/usr/bin/env ruby
require_relative "../config/environment"

CSV.foreach(File.path("books.csv"), { :col_sep => '|' }) do |col|
  #puts col[0]
end
