defmodule Regalia.Repo.Migrations.CreateModels do
  use Ecto.Migration

  def change do
    create table(:models, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:name, :string, null: false)
      add(:grade, :string)
      add(:series, :string)
      add(:status, :string)
      add(:user_id, references(:users, type: :uuid, on_delete: :nothing), null: false)

      timestamps(type: :utc_datetime)
    end

    create(index(:models, [:user_id]))
  end
end
