class VisitsController < ApplicationController

   def index
      visits = Visit.all
      render json: visits, status: :ok
   end

   def show
      visit = find_visit
      render json: visit, status: :ok
   end

   private

   def find_visit
      Visit.find(params[:id])
   end
   
end
