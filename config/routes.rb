Rails.application.routes.draw do


  resources :request_states

  resources :requests do
    member do
      match 'get_pending', :via => [:post, :get]
    end
  end

  resources :invitations do
    member do
      match 'send_with_token', :via => [:post, :get]
    end
  end

  devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}#, :skip => [:registrations]

  devise_scope :user do
    get 'logout', :to => "devise/sessions#destroy"
    get 'login', :to => "devise/sessions#new"
    get 'register', :to => "devise/registrations#new"
  end

  resources :users

  root :to => "display#index"

end
