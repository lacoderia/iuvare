Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
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

  devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}#, :skip => [:registrations]

  resources :users

  devise_scope :user do
    get 'logout', :to => "devise/sessions#destroy"
    #get 'login', :to => "devise/sessions#new"
    get 'register', :to => "devise/registrations#new"
    get 'session', :to => "sessions#get"
  end

  root :to => "display#index"
  get "*path", :to => "display#index"

end
