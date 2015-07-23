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

  scope :by_asset_type, -> (asset_type){where(asset_type: asset_type).order(updated_at: :desc)}
  scope :by_keyword, -> (keyword){where("lower(title) like '%#{keyword}%' OR lower(description) like '%#{keyword}%' OR lower(author) like '%#{keyword}%'").(updated_at: :desc)}

  def self.stream_file asset_type, source

    filepath = "#{ENV["PATH_TO_ASSETS"]}/#{asset_type}s/" + source
    video_extension = File.extname(filepath)[1..-1]
    return [filepath, video_extension]
    
  end
end
