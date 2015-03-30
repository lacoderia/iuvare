Rails.application.routes.draw do

  resources :requests  do
    member do
      post 'accept'
      post 'reject'
    end
  end

  resources :invitations

  devise_for :users, :controllers => {:registrations => "registrations", :sessions => "sessions"}#, :skip => [:registrations]

  devise_scope :user do
    get 'logout', :to => "devise/sessions#destroy"
    #get 'login', :to => "devise/sessions#new"
    get 'register', :to => "devise/registrations#new"
    get 'session', :to => "sessions#get"
  end

  resources :users

  root :to => "display#index"
  get "*path", :to => "display#index"

end
