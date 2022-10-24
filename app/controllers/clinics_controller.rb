class ClinicsController < ApplicationController

   def index
      clinics = Clinic.all
      render json: clinics, status: :ok
   end

   def show
      clinic = find_clinic
      render json: clinic, status: :ok
   end

   private

   def find_clinic
      Clinic.find(params[:id])
   end
   
end
