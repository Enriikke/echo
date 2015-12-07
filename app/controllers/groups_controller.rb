class GroupsController < ApplicationController
  before_action :authenticate_user!

  def show
    @group = Group.find(params[:id])
  end

  def create
    @group = current_user.groups.new(token: SecureRandom.urlsafe_base64)
    if @group.save
      flash[:notice] = "Group successfully created."
      redirect_to @group
    else
      flas[:alert] = "Group could NOT be created."
      redirect_to current_user
    end
  end
end
