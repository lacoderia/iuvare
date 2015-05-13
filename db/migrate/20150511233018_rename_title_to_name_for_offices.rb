class RenameTitleToNameForOffices < ActiveRecord::Migration
  def change
    rename_column :offices, :title, :name
  end
end
