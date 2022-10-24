# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "> seeding data..."

num_vets = 5
num_owners = 30
num_cats = 30
num_dogs = 20
num_visits = 100

num_pets = num_cats + num_dogs

puts "🌱 seeding clinics..."

Clinic.create({
   name: "DC Vet",
   address: Faker::Address.full_address,
   phone: Faker::PhoneNumber.phone_number_with_country_code,
   fax: Faker::PhoneNumber.extension,
   email: "hello@dc-vet.co"
})

puts "🌳 done seeding clinics"


puts "🌱 seeding vets..."

num_vets.times do
   first_name = Faker::Name.first_name
   clinic = Clinic.first
   Vet.create({
      first_name: first_name,
      last_name: Faker::Name.last_name,
      extension: Faker::PhoneNumber.extension,
      email: Faker::Internet.email(name: first_name, domain: clinic.name, separators: '-'),
      clinic_id: clinic.id
   })
end

puts "🌳 done seeding vets"


puts "🌱 seeding pets..."

num_dogs.times do
   Pet.create({
      name: Faker::Creature::Dog.name,
      species: "DOG",
      breed: Faker::Creature::Dog.breed,
      color: Faker::Color.color_name,
      birthday: Faker::Date.between(from: 10.years.ago, to: Date.yesterday),
      vet_id: rand(1..num_vets)
   })
end

num_cats.times do
   Pet.create({
      name: Faker::Creature::Cat.name,
      species: "CAT",
      breed: Faker::Creature::Cat.breed,
      color: Faker::Color.color_name,
      birthday: Faker::Date.between(from: 20.years.ago, to: Date.yesterday),
      vet_id: rand(1..num_vets)
   })
end

puts "🌳 done seeding pets"


puts "🌱 seeding owners..."

num_owners.times do
   first_name = Faker::Name.first_name
   Owner.create({
      first_name: first_name,
      last_name: Faker::Name.last_name,
      address: Faker::Address.full_address,
      phone: Faker::PhoneNumber.phone_number,
      email: Faker::Internet.free_email(name: first_name)
   })
end

puts "🌳 done seeding owners"


puts "🌱 seeding pet owners..."

Pet.all.each do |pet|
   num_pet_owners = rand(1..2)
   num_pet_owners.times do
      PetOwner.create({
         pet_id: pet.id,
         owner_id: rand(1..num_owners)
      })
   end
end

Owner.all.each do |owner|
   if owner.pets.nil?
      PetOwner.create({
         pet_id: rand(1..num_pets),
         owner_id: owner.id
      })
   end
end

puts "🌳 done seeding pet owners"


puts "🌱 seeding visits..."

num_visits.times do

   schedule = Faker::Time.between_dates(from: Date.today - 14, to: Date.today + 14, period: :day)

   checkin = nil
   if schedule.today?
      checkin = Faker::Time.between(from: DateTime.now - 1, to: DateTime.now + 1)
   elsif schedule < Date.today
      checkin = schedule
   end

   diagnosis = nil
   note = nil
   if checkin
      diagnosis = Faker::Emotion.noun
      note = Faker::Quote.famous_last_words
   end

   Visit.create({
      schedule: schedule,
      checkin: checkin,
      diagnosis: diagnosis,
      note: note,
      vet_id: rand(1..num_vets),
      pet_id: rand(1..num_pets)
   })
   
end

puts "🌳 done seeding visits"


puts "✅ done seeding data"