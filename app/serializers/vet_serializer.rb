class VetSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :extension, :email
end
