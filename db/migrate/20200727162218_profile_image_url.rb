class ProfileImageUrl < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :email, :string
    add_column :users, :email, :string
    add_column :users, :profile_img_url, :string

  end
end
