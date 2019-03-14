defmodule HuskyShopWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use HuskyShopWeb, :controller

  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(HuskyShopWeb.ChangesetView)
    |> render("error.json", changeset: changeset)
  end

  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(HuskyShopWeb.ErrorView)
    |> render(:"404")
  end

  def call(conn, {:error, "invalid password"}) do
    conn
    |> put_resp_header("content-type", "application/json; charset=UTF-8")
    |> send_resp(:unprocessable_entity, Jason.encode!(%{error: "auth failed"}))
  end
end
