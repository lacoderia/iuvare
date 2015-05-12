FactoryGirl.define do
  factory :event, class: Event do
    title "Seminario"
    date Date.today
    description "Seminario en centro Banamex"
    picture ""
  end

end
