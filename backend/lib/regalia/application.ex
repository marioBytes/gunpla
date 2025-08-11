defmodule Regalia.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      RegaliaWeb.Telemetry,
      Regalia.Repo,
      {DNSCluster, query: Application.get_env(:regalia, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Regalia.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Regalia.Finch},
      # Start a worker by calling: Regalia.Worker.start_link(arg)
      # {Regalia.Worker, arg},
      # Start to serve requests, typically the last entry
      RegaliaWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Regalia.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RegaliaWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
