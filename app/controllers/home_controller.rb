class HomeController < ApplicationController
  def index
    ActionCable.server.broadcast 'tests',
      test: "SIGNED IN!!"
  end
end
