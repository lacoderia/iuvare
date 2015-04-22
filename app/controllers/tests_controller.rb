class TestsController < ApplicationController 
  before_action :set_goal, only: [:show, :edit, :update, :destroy]

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
    @test = Test.includes(:questions => :answers).find_by(code: params[:code])
    if @test
      render "by_code.json"
    else
      @errors = "Test not found"
      render "by_code.json", status: 500
    end
  end

  private

    def set_test
      @test = Test.find(params[:id])
    end

    def test_params
      params.require(:test).permit(:name, :test_type, :code)
    end
end

