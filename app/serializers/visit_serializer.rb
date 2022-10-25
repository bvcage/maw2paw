class VisitSerializer < ActiveModel::Serializer
  attributes :id, :schedule, :checkin, :diagnosis, :note
  belongs_to :pet
  belongs_to :vet
end
