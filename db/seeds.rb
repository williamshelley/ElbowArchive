# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"
require "set"
require "open-uri"
require "activerecord-reset-pk-sequence"

User.destroy_all
User.reset_pk_sequence

Post.destroy_all
Post.reset_pk_sequence

FriendRequest.destroy_all
FriendRequest.reset_pk_sequence

Like.destroy_all
Like.reset_pk_sequence

hermione = User.create!(
    first_name: "Hermione", 
    last_name: "Granger", 
    email: "hermione_granger@gmail.com", 
    phone_number: "646-555-5678", 
    password: "password", 
    birth_date: "1981-04-10",
    gender: "Female")


harry = User.create!(
    first_name: "Harry", 
    last_name: "Potter", 
    email: "harry_potter@gmail.com", 
    phone_number: "917-111-1234", 
    password: "password", 
    birth_date: "1981-07-31",
    gender: "Male")


users = Set.new()
users.add(harry)
users.add(hermione)

NUM_USERS = 100

p "start while loop"
while users.length < NUM_USERS do
    name = Faker::Movies::HarryPotter.character.split(" ")

    user = User.new(
        first_name: name.first, 
        last_name: name.last, 
        email: "#{name.first}.#{name.last}@gmail.com", 
        phone_number: Faker::PhoneNumber.phone_number, 
        password: "password", 
        birth_date: Faker::Date.between(from: '1980-01-10', to: '2020-01-10'),
        gender: Faker::Gender.type)

    users.to_a.each do |u|
        if u.first_name == user.first_name
            user.first_name += "#{users.size}"
            e = user.email.split("@")
            user.email = "#{e[0]}#{users.size}@#{e[1]}"
        end
    end
    
    p user.email
    users << user
end

users_a = users.to_a
users_a = users_a.select { |user| !user.nil? and user.save }
# users_a.each { |user| user.save }

users_a.each do |user|
    p "#{user.id} post"
    (1...5).each do |n|
        post = Post.new(
            author_id: user.id,
            wall_id: users_a.sample.id,
            body: Faker::Movies::HarryPotter.quote,
            date_posted: Faker::Date.between(from: '1980-01-10', to: '2020-01-10'))
        post.save
    end
end