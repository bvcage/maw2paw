class CreatePetOwners < ActiveRecord::Migration[7.0]
  def change
    create_table :pet_owners do |t|
      t.integer :pet_id
      t.integer :owner_id

      t.timestamps
    end
  end
end
