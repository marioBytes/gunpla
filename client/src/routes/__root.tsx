import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthState } from '@/types/auth'
import { useAuth } from '@/auth'

interface RouterContext {
  auth: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const { user, logout } = useAuth()

  return (
    <>
      {user && (
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      <Outlet />
    </>
  )
}
