defmodule HuskyShop.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products) do
      add :name, :string, null: false
      add :desc, :text, null: false
      add :price, :decimal, null: false
      add :inventory, :integer, null: false, default: 0

      timestamps()
    end

    create index(:products, [:name], unique: true)
  end
end
