class EventsController < InheritedResources::Base
  
  authorize_resource
  
  def current
    event_type = params[:event_type]
    
    if not event_type
      event_type = 'seminar'
    end
    
    @events = Event.current(event_type)
  end
  
  private

    def event_params
      params.require(:event).permit(:title, :date, :description, :picture, :event_type)
    end
end

