class AddUplineDeletionRestrictionForeignKey < ActiveRecord::Migration
  def change
    add_foreign_key :users, :users, column: :upline_id, primary_key: "id", on_delete: :restrict
  end
end
