class VisitsController < ApplicationController

   def create
      visit = Visit.create!(visit_params)
      render json: visit, status: :created
   end

   def index
      visits = Visit.all
      # iterate thru optional parameters
      if (params.keys.length > 2) then visits = filter_by_params visits end
      # sort chronologically
      visits = visits.sort_by { |v| v.scheduled_for }
      # render & return
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
      params.permit(
         :pet_id,
         :vet_id,
         :scheduled_for,
         :diagnosis,
         :arrived_at,
         :departed_at,
         :location,
         :reason,
         :status,
         :completed_by
      )
   end

   def filter_by_params visits
      params.each do |key, value|
         case key
         when "pet_id"
            pet = Pet.find(params[:pet_id])
            visits = pet.visits
         end
      end
      visits
   end

   def find_visit
      Visit.find(params[:id])
   end
   
end
