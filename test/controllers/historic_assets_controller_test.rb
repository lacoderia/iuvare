require 'test_helper'

class HistoricAssetsControllerTest < ActionController::TestCase
  setup do
    @historic_asset = historic_assets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:historic_assets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create historic_asset" do
    assert_difference('HistoricAsset.count') do
      post :create, historic_asset: { description: @historic_asset.description, historic_asset_type: @historic_asset.historic_asset_type }
    end

    assert_redirected_to historic_asset_path(assigns(:historic_asset))
  end

  test "should show historic_asset" do
    get :show, id: @historic_asset
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @historic_asset
    assert_response :success
  end

  test "should update historic_asset" do
    patch :update, id: @historic_asset, historic_asset: { description: @historic_asset.description, historic_asset_type: @historic_asset.historic_asset_type }
    assert_redirected_to historic_asset_path(assigns(:historic_asset))
  end

  test "should destroy historic_asset" do
    assert_difference('HistoricAsset.count', -1) do
      delete :destroy, id: @historic_asset
    end

    assert_redirected_to historic_assets_path
  end
end
