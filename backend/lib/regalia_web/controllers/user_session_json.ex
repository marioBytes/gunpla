defmodule RegaliaWeb.UserSessionJSON do
  def show(%{token: token}) do
    %{data: data(token)}
  end

  defp data(token) when is_binary(token) do
    %{token: token}
  end
end
