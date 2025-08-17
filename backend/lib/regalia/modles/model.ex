defmodule Regalia.Models.Model do
  use Ecto.Schema

  import Ecto.Changeset

  alias Regalia.Accounts.User

  @type t :: %__MODULE__{
          id: Ecto.UUID.t(),
          name: String.t(),
          status: String.t(),
          grade: String.t(),
          series: String.t(),
          user: User.t()
        }

  @primary_key {:id, Ecto.UUID, autogenerate: true}

  schema "models" do
    field(:name, :string)
    field(:status, :string)
    field(:grade, :string)
    field(:series, :string)

    belongs_to(:user, User, type: :binary_id)

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(model, attrs) do
    model
    |> cast(attrs, [:name, :grade, :series, :status, :user_id])
    |> validate_required([:name, :user_id])
  end
end
