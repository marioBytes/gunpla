defmodule RegaliaWeb.UserSessionJSON do
  def show(%{user: user}) do
    %{data: data(user)}
  end

  def render(%{error: error}) do
    %{error: error}
  end

  defp data(user) do
    %{
      id: user.id,
      email: user.email,
      username: user.username
    }
  end
end
