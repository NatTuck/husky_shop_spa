defmodule HuskyShopWeb.CartItemController do
  use HuskyShopWeb, :controller

  alias HuskyShop.CartItems
  alias HuskyShop.CartItems.CartItem

  action_fallback HuskyShopWeb.FallbackController

  def index(conn, _params) do
    cart_items = CartItems.list_cart_items()
    render(conn, "index.json", cart_items: cart_items)
  end

  def create(conn, %{"cart_item" => cart_item_params}) do
    with {:ok, %CartItem{} = cart_item} <- CartItems.create_cart_item(cart_item_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.cart_item_path(conn, :show, cart_item))
      |> render("show.json", cart_item: cart_item)
    end
  end

  def show(conn, %{"id" => id}) do
    cart_item = CartItems.get_cart_item!(id)
    render(conn, "show.json", cart_item: cart_item)
  end

  def update(conn, %{"id" => id, "cart_item" => cart_item_params}) do
    cart_item = CartItems.get_cart_item!(id)

    with {:ok, %CartItem{} = cart_item} <- CartItems.update_cart_item(cart_item, cart_item_params) do
      render(conn, "show.json", cart_item: cart_item)
    end
  end

  def delete(conn, %{"id" => id}) do
    cart_item = CartItems.get_cart_item!(id)

    with {:ok, %CartItem{}} <- CartItems.delete_cart_item(cart_item) do
      send_resp(conn, :no_content, "")
    end
  end
end
