class QuestionsController < InheritedResources::Base

  private

    def question_params
      params.require(:question).permit(:test_id, :text)
    end
end

