defmodule RegaliaWeb.UserResetPasswordJSON do
  def new(%{message: message}) do
    %{message: message}
  end
end
