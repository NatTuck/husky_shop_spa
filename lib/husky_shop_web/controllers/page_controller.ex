defmodule HuskyShopWeb.PageController do
  use HuskyShopWeb, :controller

  def index(conn, _params) do
    products = HuskyShop.Products.list_products()
    |> Enum.map(fn prod ->
      HuskyShopWeb.ProductView.render("product.json", %{product: prod})
    end)
    render conn, "index.html", products: products
  end
end
