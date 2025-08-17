defmodule Regalia.ModelsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Regalia.Models` context.
  """

  @doc """
  Generate a model.
  """
  def model_fixture(attrs \\ %{}) do
    {:ok, model} =
      attrs
      |> Enum.into(%{
        grade: "some grade",
        name: "some name",
        series: "some series",
        status: "some status"
      })
      |> Regalia.Models.create_model()

    model
  end
end
