Rails.application.routes.draw do

  resources :downlines, controller: "users", only: [] do
    collection do
      get 'all'
      get 'cycle'
    end
  end

  resources :requests  do
    member do
      post 'accept'
      post 'reject'
    end
  end

  resources :invitations

  devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}#, :skip => [:registrations]

  resources :users

  devise_scope :user do
    get 'logout', :to => "devise/sessions#destroy"
    #get 'login', :to => "devise/sessions#new"
    get 'register', :to => "devise/registrations#new"
    get 'session', :to => "sessions#get"
  end

  root :to => "display#index"
  get "login", :to => "display#index"
  get "negocio", :to => "display#index"
  get "negocio/mi-red", :to => "display#index"
  get "negocio/ciclo", :to => "display#index"

end
