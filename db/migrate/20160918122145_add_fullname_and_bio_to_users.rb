class AddFullnameAndBioToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :fullname, :string
    add_column :users, :bio, :text
  end
end
