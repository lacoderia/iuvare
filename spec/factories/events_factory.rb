FactoryGirl.define do
  factory :event, class: Event do
    title "Seminario"
    date Time.zone.now
    description "Seminario en centro Banamex"
    # picture "picture" 
    picture_file_name 'picture.jpg'
    picture_content_type 'image/jpeg'
    picture_file_size 1.megabyte
  end

end
