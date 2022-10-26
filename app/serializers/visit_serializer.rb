class VisitSerializer < ActiveModel::Serializer
  attributes :id, :schedule, :checkin, :diagnosis, :note
  belongs_to :pet
  has_many :owners
  belongs_to :vet
end
