defmodule HuskyShopWeb.ProductView do
  use HuskyShopWeb, :view
  alias HuskyShopWeb.ProductView

  def render("index.json", %{products: products}) do
    %{data: render_many(products, ProductView, "product.json")}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      desc: product.desc,
      price: product.price,
      inventory: product.inventory}
  end
end
