# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :husky_shop,
  ecto_repos: [HuskyShop.Repo]

# Configures the endpoint
config :husky_shop, HuskyShopWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "BtzlTBL8At1a6+g5e/eUyyID8uz7Fed9YfTeAU7ntuG9WBnV/zzDk0YxQHbukZxP",
  render_errors: [view: HuskyShopWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: HuskyShop.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
