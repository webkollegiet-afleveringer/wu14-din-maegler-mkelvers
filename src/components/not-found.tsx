import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eaf2fb] px-4">
      <section className="flex max-w-xl flex-col items-center text-center">
        <h1 className="anchor/hov-block text-shadow-outline after:anchored/hov-block after:bg-primary after:-left-anchor-left-4 after:-right-anchor-right-2 after:top-anchor-bottom isolate text-[72px] leading-none font-black tracking-wider text-white uppercase text-shadow-black after:absolute after:-z-10 after:h-10 after:-translate-y-3/4 sm:text-[140px] sm:after:h-20">
          Hov!
        </h1>

        <h2 className="mt-8 text-2xl leading-tight font-bold text-[#2A2C30] sm:text-3xl">
          Du er havnet på en side som ikke findes!
        </h2>

        <p className="text-foreground mt-5 max-w-lg text-lg leading-relaxed">
          Det er vi kede af! Vi har sendt en besked af sted til vores
          internetbureau, og bedt dem se på fejlen.
        </p>

        <Link
          to="/"
          className="bg-primary mt-10 inline-flex items-center justify-center px-9 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#0f2742]"
        >
          Tilbage til forsiden
        </Link>
      </section>
    </main>
  );
}
