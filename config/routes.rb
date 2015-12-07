Rails.application.routes.draw do
  devise_for :users
  root "home#index"

  get "play", to: "games#show"
  resource :user, only: :show
end
