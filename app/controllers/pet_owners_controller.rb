class PetOwnersController < ApplicationController

   def index
      pet_owners = PetOwner.all
      render json: pet_owners, status: :ok
   end

end
