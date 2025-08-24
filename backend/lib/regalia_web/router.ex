defmodule RegaliaWeb.Router do
  use RegaliaWeb, :router

  import RegaliaWeb.UserAuth

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, html: {RegaliaWeb.Layouts, :root})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(:fetch_current_user)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :api_authenticated do
    plug(:accepts, ["json"])
    plug(:fetch_current_scope_for_api_user)
  end

  scope "/", RegaliaWeb do
    pipe_through(:browser)

    get("/", PageController, :home)
  end

  scope "/api", RegaliaWeb do
    pipe_through(:api)

    post("/signup", UserRegistrationController, :create)
    post("/login", UserSessionController, :create)
  end

  scope "/api", RegaliaWeb do
    pipe_through(:api_authenticated)

    get("/models", ModelController, :index)
    post("/models", ModelController, :create)
    get("/models/:id", ModelController, :show)
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

  ## Authentication routes

  scope "/", RegaliaWeb do
    pipe_through([:browser, :redirect_if_user_is_authenticated])

    post("/users/reset_password", UserResetPasswordController, :create)
    put("/users/reset_password/:token", UserResetPasswordController, :update)
  end

  scope "/", RegaliaWeb do
    pipe_through([:browser, :require_authenticated_user])

    put("/users/settings", UserSettingsController, :update)
  end

  scope "/", RegaliaWeb do
    pipe_through([:browser])

    delete("/users/log_out", UserSessionController, :delete)
    get("/users/confirm", UserConfirmationController, :new)
    post("/users/confirm", UserConfirmationController, :create)
    get("/users/confirm/:token", UserConfirmationController, :edit)
    post("/users/confirm/:token", UserConfirmationController, :update)
  end
end
