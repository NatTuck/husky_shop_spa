defmodule HuskyShop.Products.Product do
  use Ecto.Schema
  import Ecto.Changeset


  schema "products" do
    field :desc, :string
    field :inventory, :integer
    field :name, :string
    field :price, :decimal
    has_many :cart_items, HuskyShop.CartItems.CartItem

    timestamps()
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:name, :desc, :price, :inventory])
    |> validate_required([:name, :desc, :price, :inventory])
    |> unique_constraint(:name)
  end
end
