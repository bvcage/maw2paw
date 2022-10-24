class Owner < ApplicationRecord
   has_many :pet_owners
   has_many :pets, through: :pet_owners
end
