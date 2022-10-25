class Owner < ApplicationRecord
   has_many :pet_owners
   has_many :pets, through: :pet_owners

   def full_name
      "#{self.first_name} #{self.last_name}"
   end

end
