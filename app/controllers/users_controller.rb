class UsersController < ApplicationController

   def show
      user = find_user
      if user
         render json: user
      else
         render json: { error: "Not authorized" }, status: :unauthorized
      end
   end

   private

   def find_user
      User.find_by(id: session[:user_id])
   end
   
end
