class QuestionsController < InheritedResources::Base

  authorize_resource

  private

    def question_params
      params.require(:question).permit(:test_id, :text)
    end
end

