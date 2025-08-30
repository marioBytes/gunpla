import { createFileRoute } from '@tanstack/react-router'

import ModelViewPage from '@/components/Entry'

export const Route = createFileRoute('/entries/$entryId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ModelViewPage />
}
