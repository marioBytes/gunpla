defmodule RegaliaWeb.UserJSON do
  alias Regalia.Accounts.User

  def index(users) do
    %{data: %{user: show(users)}}
  end

  def show(%User{} = user) do
    %{
      id: user.id,
      email: user.email,
      username: user.username,
      profile_picture_url: user.profile_picture_url
    }
  end
end
