class VisitSerializer < ActiveModel::Serializer
  attributes :id, :date, :time, :checkin, :diagnosis, :note, :vet_id, :pet_id
end
