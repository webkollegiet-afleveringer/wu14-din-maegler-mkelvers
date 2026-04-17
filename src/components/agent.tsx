import type { Agent } from "#/lib/types.ts";
import { cn } from "#/lib/utils";
import { Link } from "@tanstack/react-router";

type props = React.HTMLProps<HTMLDivElement> & {
  agent: Agent;
};

export default function AgentCard({ agent, className, ...elmProps }: props) {
  return (
    <div
      {...elmProps}
      className={cn(
        "overflow-hidden border border-gray-200 bg-white shadow-xs",
        className,
      )}
    >
      <Link to="/mæglere/$id" params={{ id: agent.id }}>
        <img
          src={agent.image.url}
          alt={agent.image.name}
          className="h-72 w-full object-cover"
        />
      </Link>
      <div className="p-6 text-center">
        <h3 className="text-lg font-semibold text-[#263048]">{agent.name}</h3>
        <p className="text-sm text-[#7B7B7B]">{agent.title}</p>
        <div className="mt-4 flex flex-row justify-center gap-3">
          <a href={`mailto:${agent.email}`} className="hover:opacity-70">
            <img src="/svgs/email.svg" alt="email" className="size-5" />
          </a>
          <a href="https://example.com" className="hover:opacity-70">
            <img src="/svgs/linkedin.svg" alt="linkedin" className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
