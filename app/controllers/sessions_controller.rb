class SessionsController < ApplicationController

   def create
      user = User.find_or_create_by(user_params)
      session[:user_id] = user.id
      render json: user
   end

   def destroy
      session.delete :user_id
      head :no_content
   end

   private

   def user_params
      params.permit(:username)
   end

end