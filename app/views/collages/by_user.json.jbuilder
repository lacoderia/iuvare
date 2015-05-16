if not @collages.empty?
  json.success true
  json.set! :result do
    json.set! :collages do
      json.array! (@collages) do |collage|
        json.extract! collage, :id, :user_id, :name, :order
        json.set! :collage_images do
          json.array! (collage.collage_images) do |collage_image|
            json.extract! collage_image, :id, :picture, :order
          end
        end
      end
    end
  end
else
  json.success true 
  json.set! :result do
    json.nil!
  end
end
