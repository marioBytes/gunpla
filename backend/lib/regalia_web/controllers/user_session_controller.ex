defmodule RegaliaWeb.UserSessionController do
  use RegaliaWeb, :controller

  alias Regalia.Accounts
  alias RegaliaWeb.UserAuth

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> UserAuth.log_in_user(user)
      |> render(:show, %{user: user})
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      render(conn, :new, error_message: "Invalid email or password")
    end
  end

  def delete(conn, _params) do
    UserAuth.log_out_user_api(conn)
  end
end
