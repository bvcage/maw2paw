class VetsController < ApplicationController

   def index
      vets = Vet.all
      render json: vets, status: :ok
   end

   def show
      vet = find_vet
      render json: vet, status: :ok
   end

   private

   def find_vet
      Vet.find(params[:id])
   end

end
