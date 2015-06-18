class PaymentsController < InheritedResources::Base

  def ipn
    Payment.register_notification(params)
  end

  private

    def payment_params
      params.require(:payment).permit(:user_id, :paypal_trans_id, :amount, :payment_type)
    end
end

