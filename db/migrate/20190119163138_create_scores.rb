class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.string :name
      t.integer :mark
      t.datetime :date

      t.timestamps
    end
  end
end
