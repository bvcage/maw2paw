class ApplicationController < ActionController::API
   include ActionController::Cookies

   # before_action :authorized

   rescue_from ActiveRecord::RecordInvalid, with: :record_invalid_message
   rescue_from ActiveRecord::RecordNotFound, with: :record_not_found_message

   def authorized
      return render json: { error: "Not Authorized" }, status: :unauthorized unless session.include? :user_id
   end

   def record_invalid_message error
      render json: { error: "#{error.full_message}"}, status: :unprocessable_entity
   end

   def record_not_found_message error
      render json: { error: "#{error.model} not found" }, status: :not_found
   end

end
