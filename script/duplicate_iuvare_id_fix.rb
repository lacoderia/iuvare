#!/usr/bin/env ruby
require_relative "../config/environment"

duplicate_iuvare_id_users = User.where("(select count(*) from users u2 where users.iuvare_id = u2.iuvare_id) > 1")

tmp_iuvare_id = 0
duplicate_iuvare_id_users.each do |user|

  user.iuvare_id = "T#{tmp_iuvare_id}"
  user.save
  
  tmp_iuvare_id += 1
end
