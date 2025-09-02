defmodule RegaliaWeb.ModelController do
  use RegaliaWeb, :controller

  alias Regalia.Models
  alias Regalia.Models.Model
  alias RegaliaWeb.Authorize

  action_fallback(RegaliaWeb.FallbackController)

  def index(conn, _params) do
    user = conn.assigns.current_user
    models = Models.list_user_models(user.id)
    render(conn, :index, models: models)
  end

  def create(conn, %{"model" => model_params}) do
    user = conn.assigns.current_user.user

    with {:ok, %Model{} = model} <- Models.create_model(user, model_params) do
      conn
      |> put_status(:created)
      |> render(:show, model: model)
    end
  end

  def show(conn, %{"id" => id}) do
    model = Models.get_model!(id)
    render(conn, :show, model: model)
  end

  def update(conn, %{"id" => id, "model" => model_params}) do
    user = conn.assigns.current_user.user
    model = Models.get_model!(id)

    with :ok <- Authorize.authorized?(:model, user, model),
         {:ok, %Model{} = model} <- Models.update_model(model, model_params) do
      render(conn, :show, model: model)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = conn.assigns.current_user.user
    model = Models.get_model!(id)

    with :ok <- Authorize.authorized?(:model, user, model),
         {:ok, %Model{}} <- Models.delete_model(model) do
      send_resp(conn, :no_content, "")
    end
  end
end
