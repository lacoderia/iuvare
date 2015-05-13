FactoryGirl.define do
  factory :event, class: Event do
    title "Seminario"
    date Time.zone.now
    description "Seminario en centro Banamex"
    picture ""
  end

end
