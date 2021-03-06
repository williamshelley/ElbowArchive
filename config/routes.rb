Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"

  namespace :api, defaults: { format: :json } do 
    resource :session, only: [:create, :destroy]
    resources :users, only: [:index, :show, :create, :update] do
      resources :posts, only: [:index]
    end
    resources :posts, only: [:show, :destroy, :create, :update]
    resources :friend_requests, only: [:index, :destroy, :update, :create]
    resources :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy, :update]
  end

end
