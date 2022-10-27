class Visit < ApplicationRecord
   validates :scheduled_for, presence: true
   
   belongs_to :vet
   belongs_to :pet
   has_many :owners, through: :pet
end
