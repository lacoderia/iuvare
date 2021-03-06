class Asset < ActiveRecord::Base

  has_many :plans
  belongs_to :test
  
  TYPES = [
    ['audio', 'audio'],
    ['seminar', 'seminario'],
    ['convention', 'convencion'],
    ['training', 'capacitacion'],
    ['document', 'documento'],
    ['plan', 'plan'],
    ['FAQ', 'FAQ']
  ]

  validates :asset_type, inclusion: {in: TYPES.map{ |pairs| pairs[0] } }

  scope :by_asset_type, -> (asset_type){where("asset_type = ? and active = ?", asset_type, true).order(updated_at: :desc)}
  scope :by_keyword, -> (keyword){where("lower(title) like '%#{keyword}%' OR lower(description) like '%#{keyword}%' OR lower(author) like '%#{keyword}%' and active = ?", true)}

  def self.stream_file asset_type, source

    filepath = "#{ENV["PATH_TO_ASSETS"]}/#{asset_type}s/" + source
    if asset_type.eql? "audio"
      extension = "mp3" 
    else
      extension = File.extname(filepath)[1..-1]
    end
    return [filepath, extension]
    
  end
end
