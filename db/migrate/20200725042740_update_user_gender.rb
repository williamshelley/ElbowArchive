class UpdateUserGender < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :gender, :string
    add_column :users, :gender, :string
    remove_column :users, :birth_date, :datetime
    add_column :users, :birth_date, :date, null: false
  end
end
