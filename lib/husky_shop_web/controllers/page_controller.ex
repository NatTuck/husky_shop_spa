defmodule HuskyShopWeb.PageController do
  use HuskyShopWeb, :controller

  def index(conn, _params) do
    products = HuskyShop.Products.list_products()
    |> Enum.map(&(Map.take(&1, [:id, :name, :desc, :price])))
    render conn, "index.html", products: products
  end
end
