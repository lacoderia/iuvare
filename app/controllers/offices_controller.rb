class OfficesController < InheritedResources::Base
	
	def by_name
		@offices = Office.by_name
	end

  private
    def office_params
      params.require(:office).permit(:title, :address, :latitude, :longitude, :description, :schedule)
    end
end

