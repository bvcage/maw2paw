class Owner < ApplicationRecord
   validates :first_name, presence: true
   validates :last_name, presence: true
   validates :address, presence: true
   validate :contact_info_is_present

   has_many :pet_owners
   has_many :pets, through: :pet_owners

   def full_name
      "#{self.first_name} #{self.last_name}"
   end

   private

   def contact_info_is_present
      return unless phone.blank? && email.blank?
      errors.add(:base, 'Must provide contact information')
   end

end
