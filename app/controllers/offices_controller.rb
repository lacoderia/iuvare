class OfficesController < ApplicationController 
  
  respond_to :html, :json
	
  def ordered_by_name
    @offices = Office.ordered_by_name
  end

  private
    def office_params
      params.require(:office).permit(:name, :address, :latitude, :longitude, :description, :schedule)
    end
end

