class Pet < ApplicationRecord
   belongs_to :vet
   has_many :pet_owners
   has_many :owners, through: :pet_owners
end
