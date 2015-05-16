require 'test_helper'

class CollagesControllerTest < ActionController::TestCase
  setup do
    @collage = collages(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:collages)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create collage" do
    assert_difference('Collage.count') do
      post :create, collage: { name: @collage.name, order: @collage.order, user_id: @collage.user_id }
    end

    assert_redirected_to collage_path(assigns(:collage))
  end

  test "should show collage" do
    get :show, id: @collage
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @collage
    assert_response :success
  end

  test "should update collage" do
    patch :update, id: @collage, collage: { name: @collage.name, order: @collage.order, user_id: @collage.user_id }
    assert_redirected_to collage_path(assigns(:collage))
  end

  test "should destroy collage" do
    assert_difference('Collage.count', -1) do
      delete :destroy, id: @collage
    end

    assert_redirected_to collages_path
  end
end
