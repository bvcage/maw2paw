class Vet < ApplicationRecord
   belongs_to :clinic
   has_many :pets
   has_many :owners, through: :pets
   has_many :visits

   def full_name
      "Dr. #{self.first_name} #{self.last_name}"
   end

   def initials
      "#{self.first_name[0,1]} #{self.last_name[0,1]}"
   end
end
