class CreateProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
      t.integer :category_id
      t.string :name, :null => false
      t.text :description
      t.decimal :price, :null => false
      t.integer :quantity
      t.boolean :promotion

      t.timestamps
    end

    add_index(:products, :category_id)
  end

  def self.down
    drop_table :products
  end
end
