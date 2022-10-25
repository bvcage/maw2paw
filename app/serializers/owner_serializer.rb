class OwnerSerializer < ActiveModel::Serializer
   attributes :id, :first_name, :last_name, :address, :phone, :email, :full_name

   def full_name
      object.full_name
   end

end
