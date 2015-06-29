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

  scope :by_asset_type, -> (asset_type){where(asset_type: asset_type)}
  scope :by_keyword, -> (keyword){where("LOWER(title) like '%#{keyword}%' OR LOWER(description) like '%#{keyword}%' OR LOWER(author) like '%#{keyword}%'")}

  def self.stream_file asset_type, source

    filepath = "#{ENV["PATH_TO_ASSETS"]}/#{asset_type}s/" + source

    video_extension = File.extname(filepath)[1..-1]

    send_file filepath,
      filename: File.basename(filepath),
      type: Mime::Type.lookup_by_extension(video_extension),
      disposition: 'inline',
      stream: true,
      buffer_size: 4096

  end
end
