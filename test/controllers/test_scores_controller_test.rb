require 'test_helper'

class TestScoresControllerTest < ActionController::TestCase
  setup do
    @test_score = test_scores(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:test_scores)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create test_score" do
    assert_difference('TestScore.count') do
      post :create, test_score: { description: @test_score.description, score: @test_score.score, test_id: @test_score.test_id, user_id: @test_score.user_id }
    end

    assert_redirected_to test_score_path(assigns(:test_score))
  end

  test "should show test_score" do
    get :show, id: @test_score
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @test_score
    assert_response :success
  end

  test "should update test_score" do
    patch :update, id: @test_score, test_score: { description: @test_score.description, score: @test_score.score, test_id: @test_score.test_id, user_id: @test_score.user_id }
    assert_redirected_to test_score_path(assigns(:test_score))
  end

  test "should destroy test_score" do
    assert_difference('TestScore.count', -1) do
      delete :destroy, id: @test_score
    end

    assert_redirected_to test_scores_path
  end
end
