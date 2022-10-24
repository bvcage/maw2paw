class PetOwnerSerializer < ActiveModel::Serializer
  attributes :id
  belongs_to :pet
  belongs_to :owner
end
