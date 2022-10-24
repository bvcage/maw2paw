class VisitSerializer < ActiveModel::Serializer
  attributes :id, :schedule, :checkin, :diagnosis, :note, :vet_id, :pet_id
end
