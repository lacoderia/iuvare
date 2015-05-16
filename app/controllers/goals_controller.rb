class GoalsController < ApplicationController
  
  before_action :set_goal, only: [:update, :destroy]

  respond_to :json

  def create
    @goal = Goal.new(goal_params)
    begin
      @goal.save!
      render "create.json"
    rescue Exception => e
      @error = e.message
      render "create.json", status: 500
    end
  end

  def update
    begin
      @goal.update_attributes(goal_params)
      render "update.json"
    rescue Exception => e
      @error = e.message
      render "update.json", status: 500
    end
  end

  def destroy
    @goal.destroy
    respond_with(@goal)
  end

  def by_user
    @goals = Goal.where(user_id: params[:user_id])
    render "by_user.json"
  end

  private

    def set_goal
      @goal = Goal.find(params[:id])
    end

    def goal_params
      params.require(:goal).permit(:user_id, :dream, :goal, :date, :goal_type)
    end
end
