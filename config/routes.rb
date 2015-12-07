Rails.application.routes.draw do
  devise_for :users
  root "home#index"

  get "play", to: "games#show"
end
