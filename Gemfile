source 'http://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'
# Use sqlite3 as the database for Active Record
gem 'pg'
#gem 'mysql2'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

# Base
gem 'state_machine'
gem 'devise'
gem 'devise_security_extension'
gem 'js-routes'
gem 'paperclip'
gem 'bootstrap-sass'
gem 'newrelic_rpm'
gem 'cancancan'

gem 'activeadmin', github: 'activeadmin'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

gem 'autoprefixer-rails'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use debugger
# gem 'debugger', group: [:development, :test]

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw]

group :assets do
  # Use SCSS for stylesheets
  gem 'sass-rails', '5.0.1'
# Use Uglifier as compressor for JavaScript assets
  gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
  gem 'coffee-rails', '~> 4.0.0'
# Imports SASS libraries
  gem 'compass-rails', github: 'Compass/compass-rails', branch: '2-0-stable'
end

group :development, :test do
  # Call 'pry' anywhere in the code to stop execution and get a debugger console
  gem 'pry-rails'
  # Automatically call pry on exception
  gem 'pry-rescue'
  # Browse the stack on pry
  gem 'pry-stack_explorer' 
  # To reload UI changes
  gem 'guard-livereload'
end

group :test do
  # Testing framework
  gem 'rspec-rails'
  # Functional testing
  gem 'capybara'
  # Testing factories
  gem "factory_girl_rails"
  # Testing coverage
  gem 'simplecov', :require => false
  # Clean database after each test
  gem 'database_cleaner'
  # Manipulate time in tests
  gem 'timecop'
end

gem 'rails_12factor', group: :production
