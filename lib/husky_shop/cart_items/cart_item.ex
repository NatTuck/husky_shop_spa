defmodule HuskyShop.CartItems.CartItem do
  use Ecto.Schema
  import Ecto.Changeset


  schema "cart_items" do
    field :count, :integer
    belongs_to :user, HuskyShop.Users.User
    belongs_to :product, HuskyShop.Products.Product

    timestamps()
  end

  @doc false
  def changeset(cart_item, attrs) do
    cart_item
    |> cast(attrs, [:count, :product_id, :user_id])
    |> unique_constraint(:user_id, name: :cart_items_user_id_product_id_index)
    |> validate_required([:count, :product_id, :user_id])
  end
end
