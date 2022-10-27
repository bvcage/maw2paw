class SessionsController < ApplicationController

   skip_before_action :authorized, only: :create

   def create
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
         session[:user_id] = user.id
         render json: user, status: :ok
      elsif !user
         render json: { error: "Username does not exist"}, status: :not_found
      elsif !user.authenticate(params[:password])
         render json: { error: "Incorrect password" }, status: :unauthorized
      else
         render json: { error: "Authentication error" }, status: :unauthorized
      end
   end

   def destroy
      session.delete :user_id
      head :no_content
   end

   private

   def user_params
      params.permit(:username, :password)
   end

end