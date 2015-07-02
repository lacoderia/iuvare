class AnswersController < InheritedResources::Base

  authorize_resource 

  private

    def answer_params
      params.require(:answer).permit(:question_id, :answer_type, :text)
    end
end

