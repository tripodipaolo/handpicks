Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }
  resources :users, only: [:show] do
    member do
      post 'followers', to: 'users#follow', as: :follow
      delete 'followers', to: 'users#unfollow', as: :unfollow
      get 'drafts'
    end
  end
  resources :stories, only: [:show, :new, :create, :edit, :update, :destroy] do
    member do
      post 'publish'
      post 'bookmarks', to: 'stories#bookmark', as: :bookmark
      delete 'bookmarks', to: 'stories#unbookmark', as: :unbookmark
    end
  end
  get '/links/infos', to: 'links#scrape'

  get '/home', to: 'home#index'
  get '/home/bookmarks', to: 'home#bookmarks', as: :bookmarks

  root to: 'welcome#index'
end
