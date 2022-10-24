class CreateVisits < ActiveRecord::Migration[7.0]
  def change
    create_table :visits do |t|
      t.timestamp :schedule
      t.timestamp :checkin
      t.string :diagnosis
      t.text :note
      t.integer :vet_id
      t.integer :pet_id

      t.timestamps
    end
  end
end
