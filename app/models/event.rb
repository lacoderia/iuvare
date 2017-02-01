class Event < ActiveRecord::Base
  
  has_attached_file :picture, :styles => { :original => "400x", :thumb => "50x"}, :default_url => ""
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/
  validates_attachment_size :picture, :less_than => 5.megabytes, :unless => Proc.new {|m| m[:picture].nil?}

  TYPES = [
    ['seminar', 'seminario'],
    ['convention', 'convencion']
  ]
  
  validates :event_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }
  
  def self.current event_type
    if event_type == 'seminar'
      Event.where("date between ? and ? and event_type = ?",Time.zone.now.at_beginning_of_month, Time.zone.now.at_end_of_month, event_type)
    else
      events = Event.where("date > ? and event_type = ?" , Time.zone.now, event_type).order(date: :asc)
      if events.size > 0
        return [events.first]
      else
        return []
      end
    end
  end
  
end
