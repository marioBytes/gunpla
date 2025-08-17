defmodule RegaliaWeb.ModelControllerTest do
  use RegaliaWeb.ConnCase

  import Regalia.ModelsFixtures

  alias Regalia.Models.Model

  @create_attrs %{
    name: "some name",
    status: "some status",
    grade: "some grade",
    series: "some series"
  }
  @update_attrs %{
    name: "some updated name",
    status: "some updated status",
    grade: "some updated grade",
    series: "some updated series"
  }
  @invalid_attrs %{name: nil, status: nil, grade: nil, series: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all models", %{conn: conn} do
      conn = get(conn, ~p"/api/models")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create model" do
    test "renders model when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/models", model: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/models/#{id}")

      assert %{
               "id" => ^id,
               "grade" => "some grade",
               "name" => "some name",
               "series" => "some series",
               "status" => "some status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/models", model: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update model" do
    setup [:create_model]

    test "renders model when data is valid", %{conn: conn, model: %Model{id: id} = model} do
      conn = put(conn, ~p"/api/models/#{model}", model: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/models/#{id}")

      assert %{
               "id" => ^id,
               "grade" => "some updated grade",
               "name" => "some updated name",
               "series" => "some updated series",
               "status" => "some updated status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, model: model} do
      conn = put(conn, ~p"/api/models/#{model}", model: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete model" do
    setup [:create_model]

    test "deletes chosen model", %{conn: conn, model: model} do
      conn = delete(conn, ~p"/api/models/#{model}")
      assert response(conn, 204)

      assert_error_sent(404, fn ->
        get(conn, ~p"/api/models/#{model}")
      end)
    end
  end

  defp create_model(_) do
    model = model_fixture()
    %{model: model}
  end
end
