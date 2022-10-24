class PetOwner < ApplicationRecord
   belongs_to :pet
   belongs_to :owner
end
