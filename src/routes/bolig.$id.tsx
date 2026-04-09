import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bolig/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/bolig/$id"!</div>
}
