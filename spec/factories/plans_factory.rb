FactoryGirl.define do
  factory :plan, class: Plan do
    association :asset, factory: :asset
    association :contact, factory: :contact
    token SecureRandom.urlsafe_base64
    expiration Time.zone.now
    description ""
  end
end
