defmodule RegaliaWeb.UserSessionJSON do
  def show(%{user: user, token: token}) do
    %{data: data(user, token)}
  end

  def render(%{error: error}) do
    %{error: error}
  end

  defp data(user, token) when is_binary(token) do
    %{
      id: user.id,
      email: user.email,
      username: user.username,
      token: token
    }
  end
end
