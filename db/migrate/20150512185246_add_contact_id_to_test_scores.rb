class AddContactIdToTestScores < ActiveRecord::Migration
  def change
    add_column :test_scores, :contact_id, :integer
  end
end
