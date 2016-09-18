class CreateLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :links do |t|
      t.text :url
      t.text :title
      t.text :description
      t.string :thumbnail_url
      t.string :favicon_url
      t.string :host
    end
  end
end
