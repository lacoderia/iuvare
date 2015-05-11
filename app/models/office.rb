class Office < ActiveRecord::Base
	
  def self.ordered_by_name
    Office.all.order(:name)
  end
	
end
