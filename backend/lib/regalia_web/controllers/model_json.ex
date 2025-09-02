defmodule RegaliaWeb.ModelJSON do
  alias Regalia.Models.Model

  @doc """
  Renders a list of models.
  """
  def index(%{models: models}) do
    %{data: for(model <- models, do: data(model))}
  end

  @doc """
  Renders a single model.
  """
  def show(%{model: model}) do
    %{data: data(model)}
  end

  defp data(%Model{} = model) do
    %{
      id: model.id,
      name: model.name,
      grade: model.grade,
      series: model.series,
      status: model.status,
      images: []
    }
  end
end
