class VetsController < ApplicationController

   def index
      vets = Vet.all
      vets = vets.sort_by { |v| v.last_name.upcase }
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
