class OwnersController < ApplicationController

   def index
      owners = Owner.all
      render json: owners, status: :ok
   end

   def show
      owner = find_owner
      render json: owner, status: :ok
   end

   private

   def find_owner
      Owner.find(params[:id])
   end
   
end
