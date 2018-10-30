defmodule HuskyShop.Repo.Migrations.CreateCartItems do
  use Ecto.Migration

  def change do
    create table(:cart_items) do
      add :count, :integer, null: false
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :product_id, references(:products, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:cart_items, [:user_id])
    create index(:cart_items, [:product_id])
    create index(:cart_items, [:user_id, :product_id], unique: true)
  end
end
