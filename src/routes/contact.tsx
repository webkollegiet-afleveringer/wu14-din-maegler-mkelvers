import PageHeader from "#/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <PageHeader title="Kontakt os" />
      <section className="m-12 mx-auto max-w-6xl">
        <h2 className="border-primary text-3xl font-medium text-[#2A2C30] after:mt-5 after:block after:w-30 after:border-4">
          Vi sidder klar til at besvare dine spørgsmål
        </h2>
        <p className="mt-6 max-w-2xl">
          Der kan opstå tvivl om mange ting nå man gerne vil, eller er i gang
          med at sælge sin bolig.  Vores medarbejdere sider klar alle ugens dage
          til at svare på dine spørgsmål.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <form className="mt-8 flex h-full flex-col rounded-xs border border-[#D3DEE8] p-4 md:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-1">
                <span className="text-foreground text-sm font-medium">
                  Navn
                </span>
                <input
                  type="text"
                  className="border border-[#D3DEE8] px-3 py-3 focus:outline-none"
                  placeholder="Indtast navn"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-foreground text-sm font-medium">
                  E-mail
                </span>
                <input
                  type="email"
                  className="border border-[#D3DEE8] px-3 py-3 focus:outline-none"
                  placeholder="Indtast e-mail"
                />
              </label>

              <label className="flex flex-col gap-1 md:col-span-2">
                <span className="text-foreground text-sm font-medium">
                  Emne
                </span>
                <input
                  type="text"
                  className="border border-[#D3DEE8] px-3 py-3 focus:outline-none"
                  placeholder="Indtast emne"
                />
              </label>

              <label className="flex flex-col gap-1 md:col-span-2">
                <span className="text-foreground text-sm font-medium">
                  Besked
                </span>
                <textarea
                  className="resize-none rounded-xs border border-[#D3DEE8] px-3 py-3 focus:outline-none"
                  placeholder="Skriv din besked her..."
                  rows={6}
                />
              </label>

              <div className="flex items-center gap-2 md:col-span-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="border border-[#D3DEE8]"
                />
                <label htmlFor="newsletter" className="text-sm">
                  Ja tak, jeg vil gerne modtage Din Mæglers nyhedsbrev
                </label>
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark w-fit px-5 py-3 text-white transition-colors"
              >
                Send besked
              </button>
            </div>
          </form>

          <aside className="mt-8 flex h-full rounded-xs border border-[#D3DEE8] p-6">
            <address className="flex h-full w-full flex-col not-italic">
              <div className="flex flex-1 flex-col items-center justify-center border-b border-[#D3DEE8] pb-6 text-center">
                <figure className="bg-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <img src="/svgs/phone.svg" alt="Telefon" className="size-6" />
                </figure>
                <h3 className="text-lg font-semibold text-[#2A2C30]">
                  Ring til os
                </h3>
                <a
                  href="tel:+4570704000"
                  className="mt-3 text-xl text-[#2A2C30]"
                >
                  +45 7070 4000
                </a>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center border-b border-[#D3DEE8] py-6 text-center">
                <figure className="bg-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <img
                    src="/svgs/paper-plane.svg"
                    alt="E-mail"
                    className="size-6"
                  />
                </figure>
                <h3 className="text-lg font-semibold text-[#2A2C30]">
                  Send en mail
                </h3>
                <a
                  href="mailto:4000@dinmaegler.dk"
                  className="mt-3 text-xl text-[#2A2C30]"
                >
                  4000@dinmaegler.dk
                </a>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center pt-6 text-center">
                <figure className="bg-primary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <svg
                    width="19"
                    height="24"
                    viewBox="0 0 19 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 0C4.25303 0 0 4.08784 0 9.12969C0 12.1226 3.34721 17.8046 6.06775 21.9285C7.88986 24.6905 11.1101 24.6905 12.9323 21.9285C15.6528 17.804 19 12.1226 19 9.12969C19 4.08725 14.747 0 9.5 0ZM9.5 13.423C6.891 13.423 4.77557 11.3901 4.77557 8.88275C4.77557 6.37544 6.891 4.34248 9.5 4.34248C12.109 4.34248 14.2244 6.37544 14.2244 8.88275C14.2244 11.3901 12.109 13.423 9.5 13.423Z"
                      fill="white"
                    />
                  </svg>
                </figure>
                <h3 className="text-lg font-semibold text-[#2A2C30]">
                  Besøg butikken
                </h3>
                <p className="mt-3 text-xl text-[#2A2C30]">
                  Stændertorvet 78,
                  <br />
                  4000 Roskilde
                </p>
              </div>
            </address>
          </aside>
        </div>
      </section>

      <section className="mt-8">
        <img
          src="/imgs/map.png"
          alt="Kort over Din Mæglers placering"
          className="h-auto w-full"
        />
      </section>
    </main>
  );
}
