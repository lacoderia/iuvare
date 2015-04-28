class TestScoresController < ApplicationController
  
  respond_to :json

  def grade_test
    begin
      @test_scores = TestScore.grade_test(params[:user_id], params[:test_code], JSON.parse(params[:answers]) )
      render "grade_test.json"
    rescue Exception => e
      @errors = e.message
      render "grade_test.json", status: 500
    end
  end

  private

    def test_score_params
      params.require(:test_score).permit(:user_id, :test_id, :score, :description)
    end
end

