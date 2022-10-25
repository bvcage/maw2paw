class UsersController < ApplicationController

   skip_before_action :authorized, only: :create

   def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
   end

   def show
      user = find_user
      if user
         render json: user
      else
         render json: { error: "Not authorized" }, status: :unauthorized
      end
   end

   private

   def user_params
      params.permit(:username, :password)
   end

   def find_user
      User.find_by(id: session[:user_id])
   end
   
end
