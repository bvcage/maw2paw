class Pet < ApplicationRecord
   validates :name, presence: true
   validates :species, presence: true
   validates :birthday, presence: true

   has_many :pet_owners
   has_many :owners, through: :pet_owners

   def self.species_and_breeds
      breeds = {}
      species = Pet.all.pluck(:species).uniq.sort
      species.each do |specie|
         breeds[specie] = Pet.where(species: specie).pluck(:breed).uniq.sort
      end
      breeds
   end

end
