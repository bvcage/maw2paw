class PetOwnersController < ApplicationController

   def index
      pet_owners = PetOwner.all
      render json: pet_owners, status: :ok
   end

   def create
      pet_owner = PetOwner.create!(pet_owner_params)
      render json: pet_owner, status: :created
   end

   private

   def pet_owner_params
      params.permit(:owner_id, :pet_id)
   end

end
