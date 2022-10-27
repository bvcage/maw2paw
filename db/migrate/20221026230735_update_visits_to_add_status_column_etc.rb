class UpdateVisitsToAddStatusColumnEtc < ActiveRecord::Migration[7.0]
  def change
   add_column :visits, :departed_at, :timestamp
   add_column :visits, :location, :integer
   add_column :visits, :reason, :string
   add_column :visits, :visit_type, :integer
   add_column :visits, :status, :integer
   rename_column :visits, :checkin, :arrived_at
   rename_column :visits, :schedule, :scheduled_for
   remove_column :visits, :note, :string
  end
end
