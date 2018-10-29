use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :husky_shop, HuskyShopWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :husky_shop, HuskyShop.Repo,
  username: "postgres",
  password: "postgres",
  database: "husky_shop_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
