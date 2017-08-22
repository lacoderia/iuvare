#!/usr/bin/env ruby
require_relative "../config/environment"

inactive = 0
not_found = 0

CSV.foreach(File.path("cancelled_users_gdl.txt"), { :col_sep => '|' }) do |col|
  iuvare_id = col[0]
  user = User.find_by_iuvare_id("#{iuvare_id}")
  if user
    user.active = false
    user.save
    inactive += 1
    puts "#{iuvare_id}"
  else
    not_found += 1
  end
end

puts "#{inactive} usuarios desactivados, #{not_found} usuarios no encontrados"
