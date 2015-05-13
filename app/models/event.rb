class Event < ActiveRecord::Base
  
  def self.current
    Event.where("date between ? and ?",Time.zone.now.at_beginning_of_month, Time.zone.now.at_end_of_month)
  end  
  
end
