json.array!(@tests) do |test|
  json.extract! test, :id, :name, :test_type, :code
end
