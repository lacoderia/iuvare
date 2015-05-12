class Event < ActiveRecord::Base
  
  def self.current
    Event.where("date between ? and ?",Date.today.at_beginning_of_month, Date.today.at_end_of_month)
  end  
  
end
