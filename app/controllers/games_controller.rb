class GamesController < ApplicationController
  def show
    @group = Group.find_by(token: params[:group])
    ActionCable.server.broadcast 'groups', id: @group.id if @group
  end
end
