import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/confirm-password-reset/$token')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/reset-password/$id"!</div>
}
