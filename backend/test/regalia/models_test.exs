defmodule Regalia.ModelsTest do
  use Regalia.DataCase

  alias Regalia.Models

  describe "models" do
    alias Regalia.Models.Model

    import Regalia.ModelsFixtures

    @invalid_attrs %{name: nil, status: nil, grade: nil, series: nil, user_id: nil}

    test "list_models/0 returns all models" do
      model = model_fixture()
      assert Models.list_models() == [model]
    end

    test "get_model!/1 returns the model with given id" do
      model = model_fixture()
      assert Models.get_model!(model.id) == model
    end

    test "create_model/1 with valid data creates a model" do
      valid_attrs = %{
        name: "some name",
        status: "some status",
        grade: "some grade",
        series: "some series"
      }

      assert {:ok, %Model{} = model} = Models.create_model(valid_attrs)
      assert model.name == "some name"
      assert model.status == "some status"
      assert model.grade == "some grade"
      assert model.series == "some series"
    end

    test "create_model/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Models.create_model(@invalid_attrs)
    end

    test "update_model/2 with valid data updates the model" do
      model = model_fixture()

      update_attrs = %{
        name: "some updated name",
        status: "some updated status",
        grade: "some updated grade",
        series: "some updated series"
      }

      assert {:ok, %Model{} = model} = Models.update_model(model, update_attrs)
      assert model.name == "some updated name"
      assert model.status == "some updated status"
      assert model.grade == "some updated grade"
      assert model.series == "some updated series"
    end

    test "update_model/2 with invalid data returns error changeset" do
      model = model_fixture()
      assert {:error, %Ecto.Changeset{}} = Models.update_model(model, @invalid_attrs)
      assert model == Models.get_model!(model.id)
    end

    test "delete_model/1 deletes the model" do
      model = model_fixture()
      assert {:ok, %Model{}} = Models.delete_model(model)
      assert_raise Ecto.NoResultsError, fn -> Models.get_model!(model.id) end
    end

    test "change_model/1 returns a model changeset" do
      model = model_fixture()
      assert %Ecto.Changeset{} = Models.change_model(model)
    end
  end
end
