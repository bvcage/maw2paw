class VisitsController < ApplicationController

   def create
      visit = Visit.create!(visit_params)
      render json: visit, status: :created
   end

   def index
      visits = Visit.all
      render json: visits, status: :ok
   end

   def show
      visit = find_visit
      render json: visit, status: :ok
   end

   def update
      visit = find_visit
      visit.update!(visit_params)
      render json: visit, status: :accepted
   end

   private

   def visit_params
      params.permit(:pet_id, :vet_id, :schedule, :checkin, :diagnosis, :note)
   end

   def find_visit
      Visit.find(params[:id])
   end
   
end
