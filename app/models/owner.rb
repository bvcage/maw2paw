class Owner < ApplicationRecord
   validates :first_name, :last_name,
      presence: true,
      format: {with: /\A[a-z ]*\z/i, message: "must only contain letters"}
   validate :contact_info_is_present
   validates :phone,
      format: {with: /\A[0-9 +()\-]*\z/, message: "contains invalid character(s)"}
   validates :email,
      format: {with: /\A([a-z0-9._]+[@]{1}[a-z0-9]+[.]{1}[a-z_\-]+)?\z/i, message: "format is invalid"}
   validates :address,
      presence: true,
      format: {with: /\A[a-z0-9 ,\-]*\z/i, message: "contains invalid character(s)"}


   has_many :pet_owners
   has_many :pets, through: :pet_owners

   def full_name
      "#{self.first_name} #{self.last_name}"
   end

   private

   def contact_info_is_present
      return unless phone.blank? && email.blank?
      errors.add(:base, 'Must provide either phone or email')
   end

   def contact_info_is_valid
      return if phone.blank? && email.blank?
      if !phone.blank? && !phone.match(/\A[0-9 +()\-]\z/) then errors.add(:base, 'Phone must only contain numbers and punctuation') end
      if !address.blank? && !address.match(/\A[a-z0-9 ,\-]+\z/i) then errors.add(:base, 'Address is invalid') end
   end

end
