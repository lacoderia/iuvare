# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
role_premier = Role.create(name: 'premier')
user = User.create(first_name: "Dios", last_name: "Premier", email: "diospremier@xango.com", xango_id: "123456", iuvare_id: "1234", active: true, xango_rank: "DIOS", password:"xangoxango", roles: [role_premier])

#Invitation.create(user_id: user.id, recipient_email:"correo@correo.com", token:"cualquiercosa")
