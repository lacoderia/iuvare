json.array!(@request_states) do |request_state|
  json.extract! request_state, :id, :name
  json.url request_state_url(request_state, format: :json)
end
