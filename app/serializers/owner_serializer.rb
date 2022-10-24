class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :address, :phone, :email
end
