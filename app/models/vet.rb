class Vet < ApplicationRecord
   belongs_to :clinic
   has_many :pets
   has_many :owners, through: :pets
   has_many :visits
end
