class TestScoresController < InheritedResources::Base

  private

    def test_score_params
      params.require(:test_score).permit(:user_id, :test_id, :score, :description)
    end
end

