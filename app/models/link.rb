class Link < ApplicationRecord
  belongs_to :story, counter_cache: true
end
