class UpdateVisitsToAddCompletedByColumn < ActiveRecord::Migration[7.0]
   def change
      add_column :visits, :completed_by, :integer
      add_foreign_key :visits, :users, column: :completed_by, primary_key: "id"
   end
end
