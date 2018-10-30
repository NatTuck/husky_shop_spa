defmodule HuskyShopWeb.SessionController do
  use HuskyShopWeb, :controller

  action_fallback HuskyShopWeb.FallbackController

  alias HuskyShop.Users.User

  def create(conn, %{"email" => email, "password" => password}) do
    with %User{} = user <- HuskyShop.Users.get_and_auth_user(email, password) do
      resp = %{
        data: %{
          token: Phoenix.Token.sign(HuskyShopWeb.Endpoint, "user_id", user.id),
          user_id: user.id,
        }
      }

      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    end
  end
end
