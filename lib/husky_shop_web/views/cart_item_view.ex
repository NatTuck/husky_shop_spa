defmodule HuskyShopWeb.CartItemView do
  use HuskyShopWeb, :view
  alias HuskyShopWeb.CartItemView

  def render("index.json", %{cart_items: cart_items}) do
    %{data: render_many(cart_items, CartItemView, "cart_item.json")}
  end

  def render("show.json", %{cart_item: cart_item}) do
    %{data: render_one(cart_item, CartItemView, "cart_item.json")}
  end

  def render("cart_item.json", %{cart_item: cart_item}) do
    product = HuskyShopWeb.ProductView.render(
      "product.json", %{product: cart_item.product})

    %{
      id: cart_item.id,
      count: cart_item.count,
      product: product,
      user_id: cart_item.user_id,
    }
  end
end
