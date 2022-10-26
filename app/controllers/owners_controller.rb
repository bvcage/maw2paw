class OwnersController < ApplicationController

   def create
      owner = Owner.create!(owner_params)
      render json: owner, status: :created
   end

   def index
      owners = Owner.all
      # iterate thru optional search parameters
      if (params.keys.length > 2) then owners = filter_by_params owners end
      # sort alphabetically by last then first
      owners = owners.sort_by { |o| [o.last_name, o.first_name] }
      # render & return
      render json: owners, status: :ok
   end

   def show
      owner = find_owner
      render json: owner, status: :ok
   end

   private

   def owner_params
      params.permit(:first_name, :last_name, :email, :phone, :address)
   end

   def filter_by_params owners
      params.each do |key, value|
         case key
         when "name"
            owners = owners.filter { |o| o.full_name.upcase.include? value.upcase}
         end
      end
      owners
   end

   def find_owner
      Owner.find(params[:id])
   end
   
end
