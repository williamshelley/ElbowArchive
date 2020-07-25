class UpdateUsers < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :full_name

    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
    add_column :users, :birth_date, :datetime, null: false
    add_column :users, :gender, :string, null: false
    add_column :users, :phone_number, :string
  end
end
