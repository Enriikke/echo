class User < ActiveRecord::Base
  has_many :groups

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable
end
