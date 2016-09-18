class AddEmbeddableToLinks < ActiveRecord::Migration[5.0]
  def change
    add_column :links, :embeddable, :boolean, default: false
  end
end
