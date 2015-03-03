require 'test_helper'

class RequestStatesControllerTest < ActionController::TestCase
  setup do
    @request_state = request_states(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:request_states)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create request_state" do
    assert_difference('RequestState.count') do
      post :create, request_state: { name: @request_state.name }
    end

    assert_redirected_to request_state_path(assigns(:request_state))
  end

  test "should show request_state" do
    get :show, id: @request_state
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @request_state
    assert_response :success
  end

  test "should update request_state" do
    patch :update, id: @request_state, request_state: { name: @request_state.name }
    assert_redirected_to request_state_path(assigns(:request_state))
  end

  test "should destroy request_state" do
    assert_difference('RequestState.count', -1) do
      delete :destroy, id: @request_state
    end

    assert_redirected_to request_states_path
  end
end
