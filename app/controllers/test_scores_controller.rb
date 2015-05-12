class TestScoresController < ApplicationController
  
  respond_to :json

  def grade_test
    begin
      @test = Test.find_by(code: params[:test_code])
      @test_scores = TestScore.grade_test(params[:user_id], @test, params[:answers], params[:contact_id] )
      render "grade_test.json"
    rescue Exception => e
      @error = e.message
      render "grade_test.json", status: 500
    end
  end

  private

    def test_score_params
      params.require(:test_score).permit(:user_id, :test_id, :score, :description)
    end
end

