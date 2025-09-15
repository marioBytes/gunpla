defmodule RegaliaWeb.Router do
  use RegaliaWeb, :router

  import RegaliaWeb.UserAuth

  pipeline :browser do
    plug(:accepts, ["html"])
  end

  pipeline :api do
    plug(:accepts, ["json"])
    plug(:fetch_session)
  end

  pipeline :api_authenticated do
    plug(:accepts, ["json"])
    plug(:fetch_session)
    plug(:fetch_current_user)
    plug(:require_authenticated_user)
  end

  scope "/", RegaliaWeb do
    pipe_through(:browser)

    get("/", PageController, :home)
  end

  scope "/api", RegaliaWeb do
    pipe_through(:api)

    post("/signup", UserRegistrationController, :create)
    post("/login", UserSessionController, :create)

    get("/models/:id", ModelController, :show)

    post("/users/resend_confirmation", UserConfirmationController, :create)
    post("/users/confirm", UserConfirmationController, :update)
    post("/users/reset_password", UserResetPasswordController, :create)
    post("/users/reset_password/:token", UserResetPasswordController, :update)
  end

  scope "/api", RegaliaWeb do
    pipe_through(:api_authenticated)

    get("/users", UserController, :show)

    get("/models", ModelController, :index)
    post("/models", ModelController, :create)
    put("/models/:id", ModelController, :update)
    delete("/models/:id", ModelController, :delete)

    delete("/logout", UserSessionController, :delete)
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:regalia, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through(:browser)

      live_dashboard("/dashboard", metrics: RegaliaWeb.Telemetry)
      forward("/mailbox", Plug.Swoosh.MailboxPreview)
    end
  end
end
