defmodule RegaliaWeb.UserResetPasswordController do
  use RegaliaWeb, :controller

  alias Regalia.Accounts

  plug(:get_user_by_reset_password_token when action in [:edit, :update])

  def create(conn, %{"user" => %{"email" => email}}) do
    if user = Accounts.get_user_by_email(email) do
      Accounts.deliver_user_reset_password_instructions(user)
    end

    message =
      "If your email is in our system, you will receive instructions to reset your password shortly."

    conn
    |> render(:new, %{message: message})
  end

  # Do not log in the user after reset password to avoid a
  # leaked token giving the user access to the account.
  def update(conn, %{"user" => user_params}) do
    case Accounts.reset_user_password(conn.assigns.user, user_params) do
      {:ok, _} ->
        conn
        |> send_resp(201, "Password updated")

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> put_view(RegaliaWeb.ChangesetJSON)
        |> render("error.json", changeset: changeset)
    end
  end

  defp get_user_by_reset_password_token(conn, _opts) do
    %{"token" => token} = conn.params

    if user = Accounts.get_user_by_reset_password_token(token) do
      conn |> assign(:user, user) |> assign(:token, token)
    else
      conn
      |> send_resp(500, "Token expired")
      |> halt()
    end
  end
end
