class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :breed, :color, :birthday, :vet_id
end
