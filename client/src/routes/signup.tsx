import { createFileRoute, redirect } from '@tanstack/react-router'

import AuthForm from '@/components/AuthForm'

export const Route = createFileRoute('/signup')({
  validateSearch: (search) => {
    return {
      redirect: (search.redirect as string) || '',
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
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = Route.useRouteContext()
  const { redirect: redirectURL } = Route.useSearch()
  const navigate = Route.useNavigate()

  return (
    <AuthForm
      auth={auth}
      redirect={redirectURL}
      navigate={navigate}
      isLogin={false}
    />
  )
}
