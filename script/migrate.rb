#!/usr/bin/env ruby
require_relative "../config/environment"
require 'mysql2' 

ENV["MYSQL_HOST"] = "localhost"
ENV["MYSQL_USER"] = ""
ENV["MYSQL_PASS"] = ""
ENV["MYSQL_DB"] = ""

connection = Mysql2::Client.new(
  host: ENV["MYSQL_HOST"],
  username: ENV["MYSQL_USER"],
  password: ENV["MYSQL_PASS"],
  database: ENV["MYSQL_DB"],
)

GOAL_TYPES = {
  1 => 'do',
  2 => 'have',
  3 => 'share',
  4 => 'travel',
  5 => 'worry_not',
  6 => 'be'
}

COLORS = {
  1 => 'purple',
  2 => 'red',
  3 => 'green',
  4 => 'yellow',
  5 => 'blue',
  6 => 'orange'
}

uplines_no_creados = {}
uplines_que_no_existen = []
usuarios_no_creados = []
metas_sin_usuario = []
contactos = []
ids_de_contactos = []

puts "LEYENDO CONTACTOS"
connection.query("select users.*, pagos.pagos_id, avance.avance_id from users left outer join pagos on pagos_user = users.id 
left outer join avance on avance_user = users.id where users.id > 844 and pagos_id is null and upline_id != 0 and payment_expiration = '0000-00-00' and (xango_id = '' and iuvare_id = '' and sponsor_xango_id = '' and sponsor_iuvare_id = '')").each do |row|

  user_id = row["upline_id"]
  name = row["first_name"] + " " + row["last_name"]
  email = row["email"]
  phone = row["telefono"]
  description = row["notas"]
  status = "to_invite"
  ids_de_contactos << row["id"]
  contactos << Contact.new(user_id: user_id, name: name, email: email, phone: phone, description: description, status: status) 

end

puts "MIGRANDO USUARIOS"
connection.query("SELECT * FROM users order by id").each do |row|

  id = row["id"]


  first_name = row["first_name"]
  last_name = row["last_name"]
  xango_id = row["xango_id"]
  iuvare_id = row["iuvare_id"]
  sponsor_xango_id = row["sponsor_xango_id"]
  sponsor_iuvare_id = row["sponsor_iuvare_id"]
  placement_xango_id = row["placement_xango_id"]
  placement_iuvare_id = row["placement_iuvare_id"]
  payment_expiration = row["payment_expiration"]
  xango_rank = row["xango_rank"]
  created_at = row["created_at"]
  updated_at = row["updated_at"]
  email = row["email"]
  phone = row["telefono"]
  address = row["direccion"]
  encrypted_password = (row["encrypted_password"].length > 0) ? "$2a" + row["encrypted_password"][3..row["encrypted_password"].length] : nil
  downline_position = row["downline_position"]
  country = (row["pais"] == 1) ? "MEXICO" : "ESPAÑA"

  if row["upline_id"] == 0
    upline_id = nil
  else
    query_for_user = User.where(id: row["upline_id"])
    if query_for_user.length == 0
      uplines_no_creados[id.to_s] = row["upline_id"]
      upline_id = nil
    else
      upline_id = row["upline_id"]
    end
  end

  u = User.new(id: id, first_name: first_name, last_name: last_name, xango_id: xango_id, iuvare_id: iuvare_id, sponsor_xango_id: sponsor_xango_id, sponsor_iuvare_id: sponsor_iuvare_id, placement_iuvare_id: placement_iuvare_id, placement_xango_id: placement_xango_id, payment_expiration: payment_expiration, xango_rank: xango_rank, created_at: created_at, updated_at: updated_at, email: email, phone: phone, address: address, password: "password", password_confirmation: "password", downline_position: downline_position, upline_id: upline_id, country: country)

  begin
  
    if not ids_de_contactos.index(id) 
      u.save!
      u.update_attribute("encrypted_password", encrypted_password)
    else
      #POSIBLE CONTACTO
      u.save!
      u.update_attribute("encrypted_password", encrypted_password)
      if u.valid_password?(u.email)
        #puts "CONTACTO VALIDADO - ID #{id} "
        u.destroy
      else
        puts "POSIBLE CONTACTO QUE SE VOLVIÓ USUARIO - ID #{id}"
      end
    end
  rescue Exception => e
    puts "USUARIOS NO CREADOS - ID #{u.id}"
    usuarios_no_creados << u
  end


end

#IMPORTANDO METAS 
puts "IMPORTANDO METAS"
connection.query("SELECT * FROM metas where metas_cat != 0").each do |row|
  goal_type = GOAL_TYPES[row["metas_cat"]]
  dream = row["metas_dream"]
  goal = row["metas_goal"]
  date = row["metas_date"]
  user_id = row["metas_user"]

  begin
    new_goal = Goal.new(goal_type: goal_type, dream: dream, goal: goal, date: date, user_id: user_id)
    new_goal.save!
  rescue ActiveRecord::RecordNotUnique => e
    puts "CONCATENANDO META #{goal_type} PARA USUARIO #{user_id}"
    g = Goal.where(goal_type: goal_type, user_id: user_id).first
    g.dream += ". " + dream
    g.goal += ". " + goal
    g.save!
  rescue ActiveRecord::InvalidForeignKey => e
    puts "GUARDANDO METAS SIN USUARIO #{user_id}"
    metas_sin_usuario << new_goal 
  end
end

#Arreglando uplines con IDs de usuarios no creados a su momento de creación
puts "ARREGLANDO UPLINES QUE NO EXISTIAN"
uplines_no_creados.each do |k, v|
  user = User.find(k)
  begin
    user.update_attribute("upline_id", v)
  rescue Exception => e
    puts "USUARIO CON ID #{v} NO EXISTE EN LA BD ORIGINAL"
    uplines_que_no_existen << v
  end
end

#MIGRANDO CONTACTOS
puts "MIGRANDO CONTACTOS"
contactos.each do |contacto|
  begin
    contacto.save!
  rescue Exception => e
    puts "CONTACTO CON NOMBRE #{contacto.name} NO SE PUDO CREAR"
  end
end

#MIGRANDO SEDES
puts "MIGRANDO SEDES"
connection.query("SELECT * FROM sedes").each do |row|

  name = row["sedes_name"]
  address = row["sedes_address"]
  lat_long = row["sedes_link"][/\/@(.*),17/,1].split(",")
  latitude = lat_long[0]
  longitude = lat_long[1]
  schedule = row["sedes_plan"]

  Office.create!(name: name, address: address, latitude: latitude, longitude: longitude, schedule: schedule)
end

#MIGRANDO AUDIOS
puts "MIGRANDO AUDIOS"
connection.query("SELECT * FROM audios").each do |row|
  
  historic_asset_type = "audio"
  number = row["audios_code"]
  name = row["audios_name"]
  author = row["audios_author"]
  color = COLORS[row["audios_color"]]

  ha = HistoricAsset.create!(historic_asset_type: historic_asset_type, number: number, name: name, author: author, color: color)
end

#MIGRANDO LIBROS
puts "MIGRANDO LIBROS"
connection.query("SELECT * FROM libros").each do |row|

  historic_asset_type = "book"
  number = row["libros_number"]
  name = row["libros_name"]
  author = row["libros_author"]
  
  ha = HistoricAsset.create!(historic_asset_type: historic_asset_type, number: number, name: name, author: author)
end
