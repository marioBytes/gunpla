defmodule RegaliaWeb.UserJSON do
  alias Regalia.Accounts.User

  def index(%{users: users}) do
    %{data: for(user <- users, do: data(user))}
  end

  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      email: user.email,
      username: user.username,
      profile_picture_url: user.profile_picture_url
    }
  end
end
