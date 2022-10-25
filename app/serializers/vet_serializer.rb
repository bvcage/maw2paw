class VetSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :extension, :email, :full_name, :initials

  def full_name
   object.full_name
  end

  def initials
   object.initials
  end
  
end
