class ClinicSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :fax, :email
end
