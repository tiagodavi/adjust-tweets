defmodule AdjustWeb.Router do
  use AdjustWeb, :router

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

  scope "/", AdjustWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/tweets", AdjustWeb do
    pipe_through :api
    get "/:term", PageController, :tweets
  end
end
