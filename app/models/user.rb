class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  acts_as_followable
  acts_as_follower

  acts_as_liker

  has_many :stories

  mount_uploader :avatar, AvatarUploader

  validates :fullname, presence: true
end
