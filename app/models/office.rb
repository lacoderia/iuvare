class Office < ActiveRecord::Base
	
	def self.by_name
		Office.all.order(:title)
	end
	
end
