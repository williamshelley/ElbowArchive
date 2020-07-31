class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :email, unique: true
      t.string :phone_number, unique: true
      t.string :gender
      t.string :profile_photo
      t.string :cover_photo
      t.date :birth_date, null: false

      t.timestamps
    end

    add_index :users, :first_name
    add_index :users, :last_name
    add_index :users, :email
    add_index :users, :phone_number
  end
end
