# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171016222321) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.integer  "question_id"
    t.string   "answer_type"
    t.text     "text"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "assets", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.string   "author"
    t.string   "source"
    t.boolean  "purchasable"
    t.float    "price"
    t.string   "asset_type"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "test_id"
    t.boolean  "active",      default: true
  end

  create_table "collage_images", force: :cascade do |t|
    t.integer  "collage_id"
    t.string   "picture"
    t.integer  "order"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  create_table "collages", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.integer  "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "description"
    t.string   "status"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.datetime "date"
    t.text     "description"
    t.string   "picture"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.string   "event_type",           default: "seminar"
  end

  create_table "goals", force: :cascade do |t|
    t.integer  "user_id"
    t.text     "dream"
    t.string   "goal"
    t.datetime "date"
    t.string   "goal_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "goals", ["user_id", "goal_type"], name: "index_goals_on_user_id_and_type", unique: true, using: :btree

  create_table "historic_assets", force: :cascade do |t|
    t.string   "historic_asset_type"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "number"
    t.string   "name"
    t.string   "author"
    t.string   "color"
    t.string   "source"
    t.string   "description"
    t.boolean  "active",              default: true
  end

  create_table "invitations", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "recipient_name"
    t.string   "recipient_email"
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "used",            default: false
  end

  create_table "offices", force: :cascade do |t|
    t.string   "name"
    t.text     "address"
    t.string   "latitude"
    t.string   "longitude"
    t.text     "description"
    t.string   "schedule"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "payments", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "paypal_trans_id"
    t.float    "amount"
    t.string   "payment_type"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "payments", ["paypal_trans_id"], name: "index_payments_on_paypal_trans_id", unique: true, using: :btree

  create_table "plans", force: :cascade do |t|
    t.integer  "asset_id"
    t.integer  "contact_id"
    t.string   "token"
    t.datetime "expiration"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "questions", force: :cascade do |t|
    t.integer  "test_id"
    t.text     "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "requests", force: :cascade do |t|
    t.string   "source_name"
    t.string   "source_email"
    t.string   "source_text"
    t.integer  "user_id"
    t.boolean  "visible",      default: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status",       default: "pending"
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles_users", id: false, force: :cascade do |t|
    t.integer "role_id"
    t.integer "user_id"
  end

  create_table "test_scores", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "test_id"
    t.float    "score"
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "contact_id"
  end

  create_table "tests", force: :cascade do |t|
    t.string   "name"
    t.string   "test_type"
    t.string   "code"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.text     "instructions"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "xango_id"
    t.string   "iuvare_id"
    t.string   "sponsor_xango_id"
    t.string   "sponsor_iuvare_id"
    t.string   "placement_xango_id"
    t.string   "placement_iuvare_id"
    t.boolean  "active",                 default: true
    t.datetime "payment_expiration"
    t.string   "xango_rank"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "email",                  default: "",   null: false
    t.string   "encrypted_password",     default: "",   null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,    null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "uid"
    t.string   "picture"
    t.integer  "downline_position"
    t.integer  "upline_id"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
    t.boolean  "kit_bought",             default: true
    t.string   "country"
    t.string   "phone"
    t.string   "address"
    t.string   "unique_session_id"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "answers", "questions"
  add_foreign_key "assets", "tests"
  add_foreign_key "collage_images", "collages"
  add_foreign_key "collages", "users"
  add_foreign_key "contacts", "users"
  add_foreign_key "goals", "users"
  add_foreign_key "invitations", "users"
  add_foreign_key "payments", "users"
  add_foreign_key "plans", "assets"
  add_foreign_key "plans", "contacts"
  add_foreign_key "questions", "tests"
  add_foreign_key "requests", "users"
  add_foreign_key "roles_users", "roles"
  add_foreign_key "roles_users", "users"
  add_foreign_key "test_scores", "tests"
  add_foreign_key "test_scores", "users"
  add_foreign_key "users", "users", column: "upline_id", on_delete: :restrict
end
