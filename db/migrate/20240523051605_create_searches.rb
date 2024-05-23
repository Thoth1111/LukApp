class CreateSearches < ActiveRecord::Migration[7.1]
  def change
    create_table :searches do |t|
      t.string :user_ip_address
      t.string :query
      t.boolean :completed

      t.timestamps
    end

    add_index :searches, :user_ip_address
    add_index :searches, :query
    add_index :searches, :completed
  end
end
