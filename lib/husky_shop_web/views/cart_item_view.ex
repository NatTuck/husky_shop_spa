defmodule HuskyShopWeb.CartItemView do
  use HuskyShopWeb, :view
  alias HuskyShopWeb.CartItemView
  alias HuskyShopWeb.ProductView
  alias HuskyShop.Products.Product

  def render("index.json", %{cart_items: cart_items}) do
    %{data: render_many(cart_items, CartItemView, "cart_item.json")}
  end

  def render("show.json", %{cart_item: cart_item}) do
    %{data: render_one(cart_item, CartItemView, "cart_item.json")}
  end

  def render("cart_item.json", %{cart_item: cart_item}) do
    product = case cart_item.product do
                %Product{} = p ->
                  render_one(cart_item.product, ProductView, "product.json")
                _ ->
                  nil
              end

    %{
      id: cart_item.id,
      count: cart_item.count,
      user_id: cart_item.user_id,
      product_id: cart_item.product_id,
      product: product
    }
  end
end
