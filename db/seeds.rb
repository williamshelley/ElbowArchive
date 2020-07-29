# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# require "faker"

User.destroy_all
User.reset_pk_sequence

User.create!(
    first_name: "Harry", 
    last_name: "Potter", 
    email: "harry_potter@gmail.com", 
    phone_number: "917-111-1234", 
    password: "password", 
    birth_date: "1981-07-31",
    gender: "Male",
    profile_img_url: "")


# (1..10).to_a.each do |n|
#     User.create!(
#         first_name: Faker::Name.first_name, 
#         last_name: Faker::Name.last_name, 
#         email: Faker::Internet.email, 
#         phone_number: Faker::PhoneNumber.phone_number, 
#         password: "password", 
#         birth_date: Faker::Date.between(from: '1980-01-10', to: '2020-01-10'),
#         gender: Faker::Gender.type,
#         profile_img_url: "")
# end