Rails.application.routes.draw do

  resources :payments do
    collection do
      post 'ipn'
    end
  end

  resources :events do
    collection do
      get 'current'
    end
  end

  resources :collage_images do
    collection do
      post 'create_by_user_id'
    end
  end

  resources :collages do
    collection do
      get 'by_user'
    end
  end

  resources :offices do
    collection do
      get 'ordered_by_name'
    end
  end

  resources :plans do
    collection do
      post 'send_video'
      post 'watch_video'
    end
    member do
      get 'finish_video'
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
      get 'by_code'
      get 'by_code_and_user'
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
    member do
      post 'change_position'
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
      get 'progress'
    end
  end

  devise_scope :user do
    get 'logout', :to => "devise/sessions#destroy"
    get 'session', :to => "sessions#get"
  end

  #get "watch_video", :to => "plans#watch_video"

  root :to => "display#index"
  get "stream", :to => "assets#stream"
  get "login", :to => "display#index"
  get "register", :to => "display#index"
  get "plan", :to => "display#index"
  get "pagos", :to => "display#index"
  match "pagos-exito", :to => "display#index", :via => [:post, :get]
  match "pagos-error", :to => "display#index", :via => [:post, :get]
  get "negocio", :to => "display#index"
  get "negocio/ciclo", :to => "display#index"
  get "negocio/lista", :to => "display#index"
  get "negocio/avance", :to => "display#index"
  get "negocio/sedes", :to => "display#index"
  get "negocio/lista-plan", :to => "display#index"
  get "sistema", :to => "display#index"
  get "sistema/audios", :to => "display#index"
  get "sistema/seminarios", :to => "display#index"
  get "sistema/convenciones", :to => "display#index"
  get "sistema/capacitaciones", :to => "display#index"
  get "sistema/documentos", :to => "display#index"
  get "perfil", :to => "display#index"
  get "perfil/mis-metas", :to => "display#index"
  get "perfil/collage", :to => "display#index"
  get "perfil/test", :to => "display#index"
  get "perfil/mis-datos", :to => "display#index"
  get "FAQ", :to => "display#index"

end
