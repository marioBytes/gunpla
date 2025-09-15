import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_confirm')({
  component: () => <Outlet />,
  beforeLoad: ({ context }) => {
    if (!context.auth.isConfirmed) {
      throw redirect({
        to: '/confirm-email',
      })
    }
  },
})
