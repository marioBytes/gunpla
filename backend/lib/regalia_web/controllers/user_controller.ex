defmodule RegaliaWeb.UserController do
  use RegaliaWeb, :controller

  def show(conn, _params) do
    user = conn.assigns.current_user

    conn
    |> render("show.json", user: user)
  end
end
