class TestsController < ApplicationController 
  
  authorize_resource
  
  before_action :set_test, only: [:show, :edit, :update, :destroy]

  respond_to :json

  def index
    @tests = Test.all
    respond_with(@tests)
  end

  def show
    respond_with(@test)
  end

  def create
    @test = Test.new(test_params)
    @test.save
    respond_with(@test)
  end

  def destroy
    @test.destroy
    respond_with(@test)
  end

  def by_code
    @test = Test.by_code(params[:code])
    render "by_code.json"
  end
  
  def by_user
    @tests = Test.by_user(params[:user_id])
  end

  def by_code_and_user
    @test = Test.by_code_and_user(params[:test_code], params[:user_id])
    render "by_code_and_user.json"
  end

  private

    def set_test
      @test = Test.find(params[:id])
    end

    def test_params
      params.require(:test).permit(:name, :test_type, :code, :instructions)
    end
end

