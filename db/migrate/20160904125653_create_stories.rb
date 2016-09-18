class CreateStories < ActiveRecord::Migration[5.0]
  def change
    create_table :stories do |t|
      t.text :title, default: ''
      t.text :content, default: ''
      t.integer :story_links_count, default: 0
      t.references :user, foreign_key: true

      t.datetime :published_at
      t.timestamps null: false
    end
  end
end
