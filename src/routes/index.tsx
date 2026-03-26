import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex h-screen">
      <section className="w-full">
        <figure className="isolate relative grid *:[grid-area:1/1] bg-[#555555]">
          <img src="/hero.jpg" className="w-full h-full object-cover mix-blend-soft-light" />
          <article className="relative flex flex-col items-center justify-center text-white gap-6">
            <h2 className="text-4xl font-bold">Søg efter din drømmebolig</h2>
            <div className="bg-white text-black p-6 w-full max-w-4xl">
              <h3 className="font-medium text-lg pb-2 after:block after:w-8 after:border-b-3 after:border-black">
                Søg blandt 158 boliger til salg i 74 butikker
              </h3>
              <p className="text-sm mb-3">Hvad skal din næste bolig indeholde</p>
              <div className="grid grid-cols-[1fr_auto] gap-3">
                <input
                  type="text"
                  placeholder="Søg på fx. glaskeramisk komfur, bryggers, kælder eller lignende"
                  className="border border-[#D3DEE8] rounded-xs p-2 w-full placeholder:text-[#7B7B7B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-primary text-white rounded-xs px-12 py-4 hover:cursor-pointer"
                >
                  Søg
                </button>
              </div>
            </div>
          </article>
        </figure>
      </section>
    </main>
  );
}
