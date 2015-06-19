class Payment < ActiveRecord::Base
  belongs_to :user

  KIT_PRICE = 1000
  ONE_MONTH_PRICE = 90
  TWELVE_MONTHS_PRICE = 900
  FREE_MONTHS = 2

  TYPES = [
    "Kit de inicio",
    "Un mes",
    "Doce meses"
  ]
  
  validates :payment_type, inclusion: {in: TYPES}

  def self.paypal_pay_object payment_type, user
    item_name = item_number = amount = nil
    result = {}

    case payment_type
    when "Kit de inicio"
      item_name = "Membresía y kit de inicio IUVARE + 2 meses gratis a iuvare.mx"
      amount = KIT_PRICE
    when "Un mes"
      item_name = "Un mes de acceso a iuvare.mx" 
      amount = ONE_MONTH_PRICE
    when "Doce meses"
      item_name = "Doce meses de acceso a iuvare.mx (sólo pagas 10 meses)" 
      amount = TWELVE_MONTHS_PRICE
    else
      raise "Tipo de pago no registrado"
    end

    result[:item_name] = item_name
    result[:custom] = user.id 
    result[:amount] = amount
    
    return result
  end

  def self.register_notification params
    item_name = params[:item_name]
    user_id = params[:custom]
    amount = params[:mc_gross].to_i
    txn_id = params[:txn_id]
    payment_status = params[:payment_status]
    currency = params[:mc_currency]
    payment_type = nil
    expiration_date = nil    

    if payment_status == "Completed" and currency == "MXN"

      user = User.find(user_id)

      case amount
      when KIT_PRICE
        payment_type = "Kit de inicio"
        expiration_date = Time.zone.now + FREE_MONTHS.months
        user.kit_bought = true
      when TWELVE_MONTHS_PRICE
        payment_type = "Doce meses"
        expiration_date = Time.zone.now + 12.months
      when ONE_MONTH_PRICE
        payment_type = "Un mes"
        expiration_date = Time.zone.now + 1.month
      else
        raise "La cantidad pagada $ #{amount} por usuario #{user_id} no equivale a ningún producto."
      end

      payment = Payment.create(user_id: user_id, paypal_trans_id: txn_id, amount: amount, payment_type: payment_type)
      user.payment_expiration = expiration_date
      user.save!
      return payment
    else
      raise "Notificación de pago no marcado como completado."
    end
  end
  
end
