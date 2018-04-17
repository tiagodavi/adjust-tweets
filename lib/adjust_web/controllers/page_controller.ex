defmodule AdjustWeb.PageController do
  use AdjustWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def tweets(conn, %{"term" => term}) do
    tweets = ExTwitter.search(term, [count: 10])
    |> Enum.map(fn(tweet) -> tweet.text end)

    json conn, %{tweets: tweets}
  end

end
