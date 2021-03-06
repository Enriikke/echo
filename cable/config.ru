require ::File.expand_path('../../config/environment',  __FILE__)
Rails.application.eager_load!

require 'action_cable/process/logging'

ActionCable.server.config.allowed_request_origins = [
  "https://echo-game.herokuapp.com",
  "http://echo-game.herokuapp.com",
  "http://localhost:3000"
]

run ActionCable.server
