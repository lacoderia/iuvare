class PaymentsController < InheritedResources::Base

  authorize_resource

  respond_to :json

  def ipn
    begin
      payment = Payment.register_notification(params)
      render status: 200, json: {success: true, result: payment.to_json }
    rescue Exception => e
      render status: 500, json: {success: false, error: e.message}
    end
  end

  private

    def payment_params
      params.require(:payment).permit(:user_id, :paypal_trans_id, :amount, :payment_type)
    end
end

