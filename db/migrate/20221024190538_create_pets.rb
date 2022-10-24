class CreatePets < ActiveRecord::Migration[7.0]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :species
      t.string :breed
      t.string :color
      t.date :birthday
      t.integer :vet_id

      t.timestamps
    end
  end
end
