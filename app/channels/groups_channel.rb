class GroupsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'groups'
  end
end
