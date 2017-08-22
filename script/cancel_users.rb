#!/usr/bin/env ruby
require_relative "../config/environment"

CSV.foreach(File.path("cancelled_users_gdl.txt"), { :col_sep => '|' }) do |col|
  iuvare_id = col[0]
  user = User.find_by_iuvare_id("#{iuvare_Id}")
  if user
    user.active = false
    user.save
  end
end
