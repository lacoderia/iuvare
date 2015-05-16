FactoryGirl.define do
  factory :collage_image, class: CollageImage do
    association :collage, factory: :collage
    # picture "picture" 
    picture_file_name 'picture.jpg'
    picture_content_type 'image/jpeg'
    picture_file_size 1.megabyte
    order 1    
  end
end
