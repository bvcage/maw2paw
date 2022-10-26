class PetsController < ApplicationController

   def create
      pet = Pet.create!(pet_params)
      render json: pet, status: :created
   end

   def index
      pets = Pet.all
      # iterate thru optional search parameters
      if (params.keys.length > 2) then pets = filter_by_params pets end
      # sort alphabetically by last then first
      pets = pets.sort_by { |pet| pet.name }
      # return json if successful
      render json: pets, status: :ok
   end

   def show
      pet = find_pet
      render json: pet, status: :ok
   end

   def species_and_breeds
      breeds = Pet.species_and_breeds
      render json: breeds, adapter: nil
   end

   private

   def pet_params
      params.permit(:name, :species, :breed, :color, :birthday)
   end

   def filter_by_params pets
      params.each do |key, value|
         puts key
         case key
         when "name"
            pets = pets.filter { |pet| pet.name.upcase.include? value.upcase}
         when "owner_id"
            owner = Owner.find(params[:owner_id])
            pets = owner.pets
         end
      end
      pets
   end

   def find_pet
      Pet.find(params[:id])
   end
   
end
