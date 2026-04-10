import AboutUs from "#/components/about-us";
import AgentCard from "#/components/agent";
import { Bolig } from "#/components/bolig";
import type { Agent, Property } from "#/lib/types";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ["properties"],
      queryFn: async (): Promise<{ homes: Property[]; agents: Agent[] }> => {
        const res = await fetch(
          "https://dinmaegler.onrender.com/homes?_limit=4",
        );
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const agents = await fetch(
          "https://dinmaegler.onrender.com/agents?_limit=3",
        );
        if (!agents.ok) throw new Error("failed to fetch agents");
        return {
          homes: await res.json(),
          agents: await agents.json(),
        };
      },
    });
    return { data };
  },
});

function RouteComponent() {
  const { data } = Route.useLoaderData();

  return (
    <main className="flex flex-col">
      <section className="w-full">
        {/* *:[grid-area:1/1] is so the image and article occupy the same space */}
        <figure className="isolate grid bg-[#444444] *:[grid-area:1/1]">
          <img
            src="/imgs/hero.webp"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover mix-blend-soft-light"
          />
          <article className="relative flex flex-col items-center justify-center gap-6 px-4 py-8 text-white">
            <h2 className="text-center text-2xl font-bold md:text-4xl">
              Søg efter din drømmebolig
            </h2>
            <div className="w-full max-w-4xl bg-white p-4 text-black md:p-6">
              <h3 className="pb-2 text-base font-medium after:block after:w-8 after:border-b-3 after:border-black md:text-lg">
                Søg blandt 158 boliger til salg i 74 butikker
              </h3>
              <p className="mb-3 text-sm">
                Hvad skal din næste bolig indeholde
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                <input
                  type="text"
                  placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
                  className="w-full rounded-xs border border-[#D3DEE8] p-2 placeholder:text-[#7B7B7B] focus:outline-none"
                />
                {/* <button */}
                {/*   type="submit" */}
                {/*   className="bg-primary w-full rounded-xs px-12 py-4 text-white hover:cursor-pointer md:w-auto" */}
                {/* > */}
                {/*   Søg */}
                {/* </button> */}
              </div>
            </div>
          </article>
        </figure>
      </section>

      <AboutUs />

      <section className="bg-[#F8F8FB]">
        <div className="mx-auto p-8 px-4 py-16 md:max-w-4xl lg:max-w-7xl">
          <article className="mx-auto max-w-xl space-y-3 p-12 text-center">
            <h2 className="text-4xl font-semibold text-[#263048]">
              Udvalgte Boliger
            </h2>
            <p className="text-foreground">
              There are many variations of passages of Lorem Ipsum available but
              the this in majority have suffered alteration in some
            </p>
          </article>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.homes.map((property: Property) => (
              <Bolig key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-primary rounded-xs px-8 py-3 text-white hover:cursor-pointer">
              Se alle boliger
            </button>
          </div>
        </div>
      </section>

      <section
        id="subscribe"
        className="flex h-fit min-h-64 items-center bg-[url('/imgs/subscribe.png')] bg-cover bg-center"
      >
        <article className="flex h-64 w-full flex-col items-center justify-center gap-4 bg-[#455463]/95 text-white bg-blend-multiply md:flex-row md:gap-8">
          <h2 className="max-w-120 px-4 text-3xl font-medium text-pretty md:px-0 md:text-wrap">
            Tilmeld dig vores nyhedsbrev og hold dig opdateret til boligmarkedet
          </h2>
          <div className="w-86">
            <input
              type="email"
              placeholder="Indtast din email addresse"
              className="text-foreground anchor/email-input h-16 w-full rounded-xs bg-white px-4 focus:outline-none"
            />
            <img
              src="/svgs/pil.svg"
              alt="Pil"
              className="anchored/email-input anchored-right-center -left-anchor-right-10 size-6"
            />
          </div>
        </article>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <article className="mx-auto max-w-2xl space-y-4 text-center">
            <h2 className="text-4xl font-semibold text-[#263048]">
              Mød vores engagerede medarbejdere
            </h2>
            <p className="text-foreground mx-auto max-w-lg">
              Din Mægler er garant for altid veluddannet assistance i dit
              boligsalg. Kontakt en af vores medarbejder
            </p>
          </article>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {data.agents.map((agent) => (
              <AgentCard agent={agent} key={agent.id} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button className="bg-primary rounded-xs px-12 py-4 text-white hover:cursor-pointer">
              Se alle mæglere
            </button>
          </div>
        </div>
      </section>

      <section id="app-download" className="bg-primary pt-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 lg:grid-cols-2">
          <article className="space-y-6 text-white">
            <h2 className="text-4xl leading-tight font-bold">
              Hold dig opdateret
              <br />
              på salgsprocessen
            </h2>
            <p className="max-w-xl text-base leading-relaxed">
              Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med
              den ansvarlige mægler eller butik med vores app. Her kan du også
              se statistik på interessen for din bolig i alle vores
              salgskanaler.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="text-primary flex items-center gap-3 rounded-xs border-2 border-white bg-white px-6 py-3">
                <img
                  src="/svgs/google-play.svg"
                  alt="google play"
                  className="size-6"
                />
                <span className="font-medium">Google Play</span>
              </button>
              <button className="flex items-center gap-3 rounded-xs border-2 border-white bg-transparent px-6 py-3 text-white">
                <img
                  src="/svgs/apple-store.svg"
                  alt="apple store"
                  className="size-6"
                />
                <span className="font-medium">Apple Store</span>
              </button>
            </div>
          </article>
          <figure className="relative flex h-96 items-center justify-end">
            <img
              src="/imgs/app-phone-2.png"
              alt="Din Mægler app property details"
              className="anchor/phone2 h-full w-auto object-contain"
            />
            <img
              src="/imgs/app-phone-1.png"
              alt="Din Mægler app browse screen"
              className="anchored/phone2 -right-anchor-left-32 md:-right-anchor-left-20 top-anchor-top-0 h-full w-auto object-contain"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}
