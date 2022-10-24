class CreateVets < ActiveRecord::Migration[7.0]
  def change
    create_table :vets do |t|
      t.string :first_name
      t.string :last_name
      t.string :extension
      t.string :email
      t.integer :clinic_id

      t.timestamps
    end
  end
end
