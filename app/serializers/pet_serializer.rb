class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :species, :breed, :color, :birthday, :vet_id
  has_many :owners
end
