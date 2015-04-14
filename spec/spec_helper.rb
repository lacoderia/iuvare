ENV["RAILS_ENV"] ||= 'test'
require File.expand_path("../../config/environment", __FILE__)

require 'simplecov'
SimpleCov.start

require 'rails/test_help'
require 'rspec/rails'
require 'capybara/rspec'
require 'capybara/rails'
require 'factory_girl'
require 'database_cleaner'
require 'devise'

Dir[Rails.root.join("spec/support/**/*.rb")].each { |f| require f }

# Checks for pending migrations before tests are run.
# If you are not using ActiveRecord, you can remove this line.
ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|

  # Authentication helpers
  config.include TestingSupport::DeviseHelpers

  # Avoid having to write FactoryGirl.create
  config.include FactoryGirl::Syntax::Methods

  # Syntax candy over capybara uglyness
  config.include TestingSupport::CapybaraHelpers

  # Route helpers
  config.include Rails.application.routes.url_helpers

  # Test driver helpers
  config.include TestingSupport::DriverHelpers

  config.before(:suite) do
    # Clean database
    DatabaseCleaner.clean_with(:truncation)

    # Use faster transaction strategy
    DatabaseCleaner.strategy = :transaction

    # Ensure clean db because in aborted specs there might be left over objects
    DatabaseCleaner.start
    DatabaseCleaner.clean
  end

  config.before(:each) do
    # Track transactions
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

  config.after(:suite) do
    DatabaseCleaner.clean
  end
end
