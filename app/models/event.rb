class Event < ActiveRecord::Base
  
  has_attached_file :picture, :styles => { :original => "600x", :thumb => "50x"}, :default_url => ""
  validates_attachment_content_type :picture, :content_type => /\Aimage\/.*\Z/
  
  def self.current
    Event.where("date between ? and ?",Time.zone.now.at_beginning_of_month, Time.zone.now.at_end_of_month)
  end  
  
end
