class PetsController < ApplicationController

   def index
      pets = Pet.all
      render json: pets, status: :ok
   end

   def show
      pet = find_pet
      render json: pet, status: :ok
   end

   private

   def find_pet
      Pet.find(params[:id])
   end
   
end
