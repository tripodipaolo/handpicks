class RenameStoryLinksCountToLinksCountInStories < ActiveRecord::Migration[5.0]
  def change
    rename_column :stories, :story_links_count, :links_count
  end
end
