import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/entries/$entryId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/entries/$entryId"!</div>
}
