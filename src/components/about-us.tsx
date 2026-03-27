export default function AboutUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-24">
        <div className="shrink-0 lg:w-1/2">
          <div className="grid">
            <div className="border-primary col-start-1 row-start-1 transform-[translate(clamp(0.75rem,2vw,2rem),clamp(0.75rem,2vw,2rem))] [border-width:clamp(6px,1.5vw,12px)]" />

            <img
              src="/imgs/about-us.webp"
              alt="Familie i deres nye hjem"
              className="col-start-1 row-start-1 h-auto w-full object-cover"
            />

            <div className="bg-primary col-start-1 row-start-1 flex h-[clamp(7rem,22vw,13rem)] w-[clamp(7rem,22vw,13rem)] transform-[translate(clamp(0.75rem,2vw,2rem),clamp(0.75rem,2vw,2rem))] flex-col items-center justify-center self-end justify-self-end text-center text-white">
              <span className="text-[clamp(1.75rem,6vw,3.75rem)] leading-none font-bold">
                38+
              </span>

              <span className="mt-1 text-[clamp(0.75rem,2.5vw,1.5rem)]">
                års mægler-
                <br />
                erfaring
              </span>
            </div>
          </div>
        </div>

        <article className="flex flex-col lg:w-1/2">
          <h2 className="text-primary mb-4 text-3xl font-bold lg:text-4xl">
            Vi har fulgt danskerne hjem i snart 4 årtier
          </h2>

          <p className="text-primary mb-6 text-lg font-semibold">
            Det synes vi siger noget om os!
          </p>

          <p className="text-foreground mb-4 leading-relaxed">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has normal distribution.
          </p>

          <p className="text-foreground mb-8 leading-relaxed">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <div className="flex items-center gap-8 md:gap-24">
            <figure className="flex gap-4">
              <img
                src="/svgs/house.svg"
                alt="Billede af CEO"
                className="size-12 bg-[#EEF7FF] object-cover p-2 md:size-20 md:p-4"
              />
              <figcaption className="flex flex-col">
                <span className="block text-base font-bold md:text-xl">
                  4829
                </span>
                <span className="text-foreground block text-sm md:text-lg">
                  boliger solgt
                </span>
              </figcaption>
            </figure>
            <figure className="flex gap-4">
              <img
                src="/svgs/home.svg"
                alt="Billede af CEO"
                className="size-12 bg-[#EEF7FF] object-cover p-2 md:size-20 md:p-4"
              />
              <figcaption className="flex flex-col">
                <span className="block text-base font-bold md:text-xl">
                  158
                </span>
                <span className="text-foreground block text-sm md:text-lg">
                  boliger til salg
                </span>
              </figcaption>
            </figure>
          </div>
        </article>
      </div>

      <hr className="mt-16 mb-8 w-full border-[#D3DEE8]" />

      <div className="grid gap-8 md:grid-cols-3">
        <article className="flex gap-4">
          <img
            src="/svgs/property.svg"
            alt="Salgstjek ikon"
            className="bg-tertiary size-12 shrink-0 bg-[#EEF7FF] object-cover p-2.5"
          />
          <div>
            <h3 className="text-primary mb-2 text-lg font-semibold">
              Bestil et salgstjek
            </h3>
            <p className="text-foreground text-sm leading-relaxed">
              Med et Din Mægler Salgstjek bliver du opdateret på værdien af din
              bolig.
            </p>
          </div>
        </article>

        <article className="flex gap-4">
          <img
            src="/svgs/location.svg"
            alt="Butikker ikon"
            className="bg-tertiary size-12 shrink-0 bg-[#EEF7FF] object-cover p-2.5"
          />
          <div>
            <h3 className="text-primary mb-2 text-lg font-semibold">
              74 butikker
            </h3>
            <p className="text-foreground text-sm leading-relaxed">
              Hos Din Mægler er din bolig til salg i alle vores 74 butikker, som
              er fordelt rundt om i Danmark.
            </p>
          </div>
        </article>

        <article className="flex gap-4">
          <img
            src="/svgs/customer.svg"
            alt="Køberkartotek ikon"
            className="bg-tertiary size-12 shrink-0 bg-[#EEF7FF] object-cover p-2.5"
          />
          <div>
            <h3 className="text-primary mb-2 text-lg font-semibold">
              Tilmeld køberkartotek
            </h3>
            <p className="text-foreground text-sm leading-relaxed">
              Når du er tilmeldt vores køberkartotek, bliver du kontaktet inden
              en ny bolig bliver annonceret.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
