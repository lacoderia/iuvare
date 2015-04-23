Rails.application.routes.draw do

  resources :answers

  resources :questions

  resources :tests do
    collection do
      match 'by_code', via: [:post, :get]
      get 'by_user'
    end
  end

  resources :test_scores do
    collection do
      post 'grade_test'
    end
  end

  resources :goals do
    collection do
      get 'by_user'
    end
  end

  devise_for :premiers, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

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

  devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions", :passwords => "passwords"}#, :skip => [:registrations]

  resources :users

  devise_scope :user do
    get 'logout', :to => "devise/sessions#destroy"
    get 'session', :to => "sessions#get"
  end

  root :to => "display#index"
  get "login", :to => "display#index"
  get "register", :to => "display#index"
  get "negocio", :to => "display#index"
  get "negocio/mi-red", :to => "display#index"
  get "negocio/ciclo", :to => "display#index"

end
