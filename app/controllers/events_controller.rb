class EventsController < InheritedResources::Base
  
  def current
    @events = Event.current
  end
  
  private

    def event_params
      params.require(:event).permit(:title, :date, :description, :picture)
    end
end

