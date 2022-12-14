class VisitSerializer < ActiveModel::Serializer
   attributes :id, :scheduled_for, :arrived_at, :departed_at, :diagnosis, :location, :reason, :status, :completed_by
   belongs_to :pet
   has_many :owners
   belongs_to :vet
end
