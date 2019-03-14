defmodule HuskyShopWeb.Router do
  use HuskyShopWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", HuskyShopWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/users", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api/v1", HuskyShopWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/products", ProductController, except: [:new, :edit]
    resources "/cart_items", CartItemController, except: [:new, :edit]
    post "/auth", AuthController, :authenticate
  end
end
