class DisplayController < ApplicationController
  #before_filter :authenticate_user!, :except => [:index, :terminos, :ranking, :borrar_requests]
  authorize_resource :class => false
end
