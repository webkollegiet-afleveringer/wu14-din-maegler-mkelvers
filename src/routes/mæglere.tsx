import AgentCard from "#/components/agent";
import PageHeader from "#/components/page-header";
import type { Agent } from "#/lib/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mæglere")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const agents = await context.queryClient.ensureQueryData({
      queryKey: ["agents"],
      queryFn: async (): Promise<Agent[]> => {
        const res = await fetch("https://dinmaegler.onrender.com/agents");
        if (!res.ok) {
          throw new Error("failed to fetch workers");
        }
        return res.json();
      },
    });
    return { agents };
  },
});

function RouteComponent() {
  const { agents } = Route.useLoaderData();

  return (
    <main>
      <PageHeader title="Medarbejdere i Roskilde" />
      <div className="container mx-auto mt-20">
        <section className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 md:p-0 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard agent={agent} key={agent.id} />
          ))}
        </section>
      </div>
    </main>
  );
}
