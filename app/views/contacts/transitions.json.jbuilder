json.success true
json.set! :result do
  json.set! :transitions do
    json.set! :to_invite do
      json.extract! @transitions[:to_invite], :previous, :next
    end
    json.set! :contacted do
      json.extract! @transitions[:contacted], :previous, :next
    end
    json.set! :to_close do
      json.extract! @transitions[:to_close], :previous, :next
    end
    json.set! :ruled_out do
      json.extract! @transitions[:ruled_out], :previous, :next
    end
    json.set! :registered do
      json.extract! @transitions[:registered], :previous, :next
    end
  end
end
