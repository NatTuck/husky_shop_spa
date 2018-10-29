defmodule HuskyShopWeb.PageController do
  use HuskyShopWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
