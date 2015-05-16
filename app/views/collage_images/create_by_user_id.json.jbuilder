if not @error
  json.success true
  json.set! :result do 
    json.extract! @collage_image, :id, :picture, :order
  end
else
  json.success false
  json.error @error
end
