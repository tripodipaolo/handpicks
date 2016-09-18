class AddStoryIdToLinks < ActiveRecord::Migration[5.0]
  def change
    add_reference :links, :story, foreign_key: true
  end
end
