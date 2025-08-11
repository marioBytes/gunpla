defmodule Regalia.Repo do
  use Ecto.Repo,
    otp_app: :regalia,
    adapter: Ecto.Adapters.Postgres
end
