import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    } else if (!!context.auth.user && !context.auth.isConfirmed) {
      throw redirect({
        to: '/confirm-email',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <Outlet />,
})
