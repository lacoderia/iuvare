class AddInstructionsToTests < ActiveRecord::Migration
  def change
    add_column :tests, :instructions, :text
  end
end
