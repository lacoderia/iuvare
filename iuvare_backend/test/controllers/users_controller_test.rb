require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  setup do
    @user = users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:users)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create user" do
    assert_difference('User.count') do
      post :create, user: { active: @user.active, email: @user.email, first_name: @user.first_name, iuvare_id: @user.iuvare_id, last_name: @user.last_name, payment_expiration: @user.payment_expiration, placement_iuvare_id: @user.placement_iuvare_id, placement_xango_id: @user.placement_xango_id, sponsor_iuvare_id: @user.sponsor_iuvare_id, sponsor_xango_id: @user.sponsor_xango_id, xango_id: @user.xango_id, xango_rank: @user.xango_rank }
    end

    assert_redirected_to user_path(assigns(:user))
  end

  test "should show user" do
    get :show, id: @user
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @user
    assert_response :success
  end

  test "should update user" do
    patch :update, id: @user, user: { active: @user.active, email: @user.email, first_name: @user.first_name, iuvare_id: @user.iuvare_id, last_name: @user.last_name, payment_expiration: @user.payment_expiration, placement_iuvare_id: @user.placement_iuvare_id, placement_xango_id: @user.placement_xango_id, sponsor_iuvare_id: @user.sponsor_iuvare_id, sponsor_xango_id: @user.sponsor_xango_id, xango_id: @user.xango_id, xango_rank: @user.xango_rank }
    assert_redirected_to user_path(assigns(:user))
  end

  test "should destroy user" do
    assert_difference('User.count', -1) do
      delete :destroy, id: @user
    end

    assert_redirected_to users_path
  end
end
