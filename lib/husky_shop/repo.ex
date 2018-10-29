defmodule HuskyShop.Repo do
  use Ecto.Repo,
    otp_app: :husky_shop,
    adapter: Ecto.Adapters.Postgres
end
