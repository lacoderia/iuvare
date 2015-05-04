Rails.application.routes.draw do

  resources :plans do
    collection do
      post 'send_video'
    end
    member do
      post 'finish_video'
    end
  end

  resources :contacts do
    collection do
      get 'by_user'
    end
  end

  resources :assets do
    collection do
      get 'by_asset_type' 
      get 'by_keyword_and_asset_type' 
    end
  end

  resources :answers

  resources :questions

  resources :tests do
    collection do
      match 'by_code', via: [:post, :get]
      match 'by_code_and_user', via: [:post, :get]
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

  resources :users do
    collection do
      get 'by_xango_id'
    end
  end

  devise_scope :user do
    get 'logout', :to => "devise/sessions#destroy"
    get 'session', :to => "sessions#get"
  end

  root :to => "display#index"
  get "login", :to => "display#index"
  get "register", :to => "display#index"
  get "negocio", :to => "display#index"
  get "negocio/ciclo", :to => "display#index"
  get "perfil", :to => "display#index"
  get "perfil/mi-perfil", :to => "display#index"
  get "perfil/mis-metas", :to => "display#index"
  get "negocio/lista", :to => "display#index"
  get "sistema", :to => "display#index"
  get "sistema/audios", :to => "display#index"
  get "sistema/seminarios", :to => "display#index"
  get "sistema/convenciones", :to => "display#index"
  get "sistema/capacitaciones", :to => "display#index"
  get "sistema/documentos", :to => "display#index"
  get "perfil", :to => "display#index"
  get "perfil/mi-perfil", :to => "display#index"
  get "perfil/mis-metas", :to => "display#index"

end
