import { createFileRoute, redirect } from '@tanstack/react-router'

import LoginForm from '@/components/LoginForm'

export const Route = createFileRoute('/login')({
  validateSearch: (search) => {
    return {
      redirect: (search.redirect as string) || '/',
    }
  },
  beforeLoad: ({ context, search }) => {
    if (context.auth.isLoading) {
      return
    }

    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect })
    }
  },
  component: Login,
})

function Login() {
  const { auth } = Route.useRouteContext()
  const { redirect: redirectURL } = Route.useSearch()
  const navigate = Route.useNavigate()

  return <LoginForm auth={auth} redirect={redirectURL} navigate={navigate} />
}

export default Login
