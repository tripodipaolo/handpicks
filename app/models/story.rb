class Story < ApplicationRecord
  has_many :links, dependent: :destroy
  belongs_to :user

  acts_as_likeable
end
