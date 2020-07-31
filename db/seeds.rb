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

Post.destroy_all
Post.reset_pk_sequence

hermione = User.create!(
    first_name: "Hermione", 
    last_name: "Granger", 
    email: "hermione_granger@gmail.com", 
    phone_number: "646-555-5678", 
    password: "password", 
    birth_date: "1981-04-10",
    gender: "Female",
    cover_photo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Hogwarts_model_studio_tour.jpg",
    profile_photo: "https://lh5.googleusercontent.com/2PNe-kCP6wYQu8MFsGmuKcpIkROCpx7P_zMC6fF6IQwyLaycNBTiuAZgCsi2QF7vwSs5muqFx9QOoh14-bdt4kUVUEIFQSwkPgzOg07luLyGtTXL0xceMqH6LRnlGPzPog")

harry = User.create!(
    first_name: "Harry", 
    last_name: "Potter", 
    email: "harry_potter@gmail.com", 
    phone_number: "917-111-1234", 
    password: "password", 
    birth_date: "1981-07-31",
    gender: "Male",
    cover_photo: "https://upload.wikimedia.org/wikipedia/commons/3/38/Hogwarts_model_studio_tour.jpg",
    profile_photo: "https://images.ctfassets.net/usf1vwtuqyxm/2PY5u8jWLYSleOz1yFmdnV/28ac9117961a02ec65c9cd7ae3bc87eb/hpah_HP4_JKT_BC__1_.jpg?fm=jpg")

Post.create!(
    author_id: harry.id,
    wall_id: harry.id,
    body: "Hogwarts is great!"
)

Post.create!(
    author_id: harry.id,
    wall_id: harry.id,
    body: "Hogwarts is amazing!"
)

Post.create!(
    author_id: hermione.id,
    wall_id: harry.id,
    body: "Hogwarts is fabulous!"
)

Post.create!(
    author_id: harry.id,
    wall_id: hermione.id,
    body: "Hogwarts is incredible!"
)

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