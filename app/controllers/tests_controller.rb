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
      @errors = "No se encontró el test"
      render "by_code.json"
    end
  end
  
  def by_user
    @tests = Test.includes(:test_scores).where("test_scores.user_id" => params[:user_id])
  end

  def by_code_and_user
    @test = Test.includes(:test_scores).find_by("test_scores.user_id" => params[:user_id], "code" => params[:test_code])
    if @test
      render "by_code_and_user.json"
    else
      @errors = "No se encontró el test con ese usuario"
      render "by_code_and_user.json"
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

