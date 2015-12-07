class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.belongs_to :user, index: true
      t.string :token, null: false, default: ""

      t.timestamps null: false
    end

    add_index :groups, :token
  end
end
