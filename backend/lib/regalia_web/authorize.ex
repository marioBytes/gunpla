defmodule RegaliaWeb.Authorize do
  alias Regalia.Accounts.User
  alias Regalia.Models.Model

  def authorized?(:model, %User{} = user, %Model{} = model),
    do: check_created_by(user, model)

  defp check_created_by(%User{id: user_id}, %{user_id: user_id}), do: :ok
  defp check_created_by(%User{}, _), do: {:error, :unauthorized}
end
