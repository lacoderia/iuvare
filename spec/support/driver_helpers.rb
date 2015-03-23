module TestingSupport
  module DriverHelpers
    def with_rack_test_driver
      current_driver = Capybara.current_driver
      Capybara.current_driver = :rack_test
      yield
      Capybara.current_driver = current_driver
    end
  end
end
