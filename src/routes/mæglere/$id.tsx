import PageHeader from "#/components/page-header";
import RouteError from "#/components/route-error";
import type { Agent } from "#/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { SubmitHandler } from "react-hook-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const agentContactSchema = z.object({
  name: z.string().min(2, "Navn skal være mindst 2 tegn"),
  email: z.email("Ugyldig email"),
  subject: z.string().min(3, "Emne skal være mindst 3 tegn"),
  message: z.string().min(10, "Besked skal være mindst 10 tegn"),
});

type AgentContactFormData = z.infer<typeof agentContactSchema>;

export const Route = createFileRoute("/mæglere/$id")({
  errorComponent: ({ error }) => <RouteError error={error} />,
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const id = params.id;
    const agent = await context.queryClient.ensureQueryData({
      queryKey: ["agent", id],
      queryFn: async (): Promise<Agent> => {
        const res = await fetch(`https://dinmaegler.onrender.com/agents/${id}`);
        if (!res.ok) {
          throw new Error(`failed to fetch agent with id ${id}`);
        }
        return res.json();
      },
    });
    return { agent };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { agent } = Route.useLoaderData();
  const [propertySearch, setPropertySearch] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AgentContactFormData>({
    resolver: zodResolver(agentContactSchema),
  });

  const onSubmit: SubmitHandler<AgentContactFormData> = (data) => {
    console.log(`Kontakt formular til ${agent.name}:`, data);
    reset();
  };

  const handlePropertySearch = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const query = propertySearch.trim();

    await navigate({
      to: "/boliger",
      search: query ? { q: query } : {},
    });
  };

  return (
    <main>
      <PageHeader title="Kontakt en medarbejder" />
      <section className="m-12 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-0">
        <article className="border border-[#D3DEE8] p-4 md:p-8">
          <figure className="flex flex-col gap-4 md:flex-row">
            <img
              src={agent.image.url}
              className="h-auto w-full max-w-70 object-cover md:h-70 md:w-70"
            />
            <figcaption>
              <h2 className="text-2xl font-medium text-[#2A2C30]">
                {agent.name}
              </h2>
              <h4 className="text-[#7B7B7B] after:mt-3 after:block after:w-8 after:border-b-2 after:border-[#D3DEE8]">
                {agent.title}
              </h4>

              <div id="socials" className="mt-4 flex flex-col gap-2">
                <a
                  data-label={agent.phone}
                  href={`tel:${agent.phone}`}
                  className="flex gap-2 after:ml-2 after:content-[attr(data-label)] hover:opacity-70"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_167_279)">
                      <path
                        d="M18.3952 13.1277C17.1707 13.1277 15.9684 12.9362 14.8291 12.5597C14.2708 12.3693 13.5845 12.544 13.2438 12.8939L10.995 14.5915C8.38703 13.1994 6.78057 11.5934 5.40745 9.00505L7.0551 6.81484C7.48318 6.38734 7.63672 5.76286 7.45276 5.17693C7.07464 4.03161 6.88255 2.8299 6.88255 1.6049C6.8826 0.719948 6.16266 0 5.27776 0H1.60484C0.719948 0 0 0.719948 0 1.60484C0 11.7481 8.25198 20 18.3952 20C19.2801 20 20.0001 19.2801 20.0001 18.3952V14.7325C20 13.8477 19.2801 13.1277 18.3952 13.1277Z"
                        fill="#162A41"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_167_279">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a
                  data-label={agent.email}
                  href={`mailto:${agent.email}`}
                  className="flex gap-2 after:ml-2 after:content-[attr(data-label)] hover:opacity-70"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_167_289)">
                      <path
                        d="M7.29199 15.6768V19.5418C7.29199 19.8118 7.46532 20.0509 7.72199 20.1359C7.78616 20.1567 7.85199 20.1667 7.91699 20.1667C8.11199 20.1667 8.30032 20.0751 8.42032 19.9118L10.6812 16.8351L7.29199 15.6768Z"
                        fill="#162A41"
                      />
                      <path
                        d="M19.7375 1.11591C19.5459 0.980074 19.2942 0.961741 19.0859 1.07091L0.335871 10.8626C0.114204 10.9784 -0.0166296 11.2151 0.00170373 11.4642C0.0208704 11.7142 0.186704 11.9276 0.422537 12.0084L5.63504 13.7901L16.7359 4.29841L8.14587 14.6476L16.8817 17.6334C16.9467 17.6551 17.015 17.6667 17.0834 17.6667C17.1967 17.6667 17.3092 17.6359 17.4084 17.5759C17.5667 17.4792 17.6742 17.3167 17.7017 17.1342L19.9934 1.71757C20.0275 1.48424 19.9292 1.25257 19.7375 1.11591Z"
                        fill="#162A41"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_167_289">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              </div>
            </figcaption>
          </figure>

          <div className="mt-4 space-y-2">
            <h2 className="after:border-primary text-xl font-medium text-[#2A2C30] after:mt-1 after:block after:w-10 after:border-b-3">
              Om {agent.name}
            </h2>
            <p>{agent.description}</p>

            <form
              className="rounded-sm border border-[#D3DEE8] p-2 md:p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="after:border-primary text-xl font-medium text-[#2A2C30] after:mt-1 after:block after:w-10 after:border-b-3">
                Kontakt {agent.name}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-foreground text-sm font-medium">
                    Navn
                  </span>
                  <input
                    type="text"
                    {...register("name")}
                    className="border border-[#D3DEE8] p-2 focus:outline-none"
                    placeholder="Indtast navn"
                  />
                  {errors.name && (
                    <span className="text-sm text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-foreground text-sm font-medium">
                    E-mail
                  </span>
                  <input
                    type="email"
                    {...register("email")}
                    className="border border-[#D3DEE8] p-2 focus:outline-none"
                    placeholder="Indtast e-mail"
                  />
                  {errors.email && (
                    <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="text-foreground text-sm font-medium">
                    Emne
                  </span>
                  <input
                    type="text"
                    {...register("subject")}
                    className="border border-[#D3DEE8] p-2 focus:outline-none"
                    placeholder="Hvad drejer din henvendelse om?"
                  />
                  {errors.subject && (
                    <span className="text-sm text-red-500">
                      {errors.subject.message}
                    </span>
                  )}
                </label>

                <label className="flex flex-col gap-1 md:col-span-2">
                  <span className="text-foreground text-sm font-medium">
                    Besked
                  </span>
                  <textarea
                    {...register("message")}
                    className="resize-none rounded-xs border border-[#D3DEE8] p-2 focus:outline-none"
                    placeholder="Skriv din besked her..."
                    rows={4}
                  />
                  {errors.message && (
                    <span className="text-sm text-red-500">
                      {errors.message.message}
                    </span>
                  )}
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary-dark w-fit px-4 py-2 text-white transition-colors disabled:opacity-50"
                >
                  Send besked
                </button>
              </div>
            </form>
          </div>
        </article>

        <aside className="flex w-full flex-col gap-4 md:w-fit">
          <section className="bg-[#EEF7FF] p-4 md:p-8">
            <h2 className="border-b border-[#D3DEE8] pb-2 text-xl font-medium text-[#2A2C30]">
              Søg bolig
            </h2>
            <form onSubmit={handlePropertySearch}>
              <input
                type="text"
                value={propertySearch}
                onChange={(event) => setPropertySearch(event.target.value)}
                placeholder="Søg efter boliger..."
                className="mt-4 w-full border border-[#D3DEE8] p-2 focus:outline-none"
              />
            </form>
          </section>

          <section className="bg-primary flex min-h-112 w-full flex-col items-center justify-center px-6 py-10 text-white md:h-110 md:w-85 md:px-4 md:py-0">
            <h2 className="max-w-xs text-center text-3xl leading-tight font-medium after:mx-auto after:mt-6 after:block after:w-20 after:border-b-4 after:border-[#D3DEE8] md:text-4xl">
              Find The Best
              <br />
              Property
              <br />
              For Rent Or Buy
            </h2>
            <h4 className="mt-4 flex max-w-xs flex-col text-center">
              Ring til os
              <span className="mt-2 text-2xl font-medium md:text-3xl">
                +45 7070 4000
              </span>
            </h4>
          </section>
        </aside>
      </section>
    </main>
  );
}
