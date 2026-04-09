import { Link } from "@tanstack/react-router";

export default function Footer() {
  return (
    <footer className="bg-background">
      <div className="bg-[#F8F8FB] pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-16">
            <img src="/svgs/logo.svg" alt="Din Mægler" className="h-12" />
            <p className="text-foreground mt-6 max-w-180 text-lg leading-relaxed">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have
              <br className="hidden md:block" />
              suffered alteration in some form, by injected humour, or
              randomised words.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-5">
              <section className="bg-background max-w-md p-10 shadow-xl lg:-mb-32">
                <address className="space-y-8 not-italic">
                  <div className="flex items-center gap-4">
                    <figure className="bg-primary text-background flex h-12 w-12 items-center justify-center rounded-full">
                      <img
                        src="/svgs/phone.svg"
                        alt="Phone"
                        className="size-6"
                      />
                    </figure>
                    <div>
                      <p className="text-foreground/60 text-xs">Ring til os</p>
                      <a
                        href="tel:+4570704000"
                        className="text-primary font-bold hover:underline"
                      >
                        +45 7070 4000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <figure className="bg-primary text-background flex h-12 w-12 items-center justify-center rounded-full">
                      <img
                        src="/svgs/paper-plane.svg"
                        alt="Mail"
                        className="size-6"
                      />
                    </figure>
                    <div>
                      <p className="text-foreground/60 text-xs">Send en mail</p>
                      <a
                        href="mailto:4000@dinmaegler.com"
                        className="text-primary font-bold hover:underline"
                      >
                        4000@dinmaegler.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <figure className="bg-primary text-background flex h-12 w-12 items-center justify-center rounded-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9996 0C9.00871 0 4.13477 4.87394 4.13477 10.8648C4.13477 18.2996 13.8578 29.2144 14.2717 29.6754C14.6605 30.1085 15.3394 30.1078 15.7275 29.6754C16.1415 29.2144 25.8645 18.2996 25.8645 10.8648C25.8644 4.87394 20.9905 0 14.9996 0ZM14.9996 16.3312C11.9854 16.3312 9.5333 13.879 9.5333 10.8648C9.5333 7.85062 11.9855 5.39848 14.9996 5.39848C18.0137 5.39848 20.4659 7.85068 20.4659 10.8649C20.4659 13.879 18.0137 16.3312 14.9996 16.3312Z"
                          fill="white"
                        />
                      </svg>
                    </figure>
                    <div>
                      <p className="text-foreground/60 text-xs">Butik</p>
                      <p className="text-primary font-bold">
                        Stændertorvet 78, 4000 Roskilde
                      </p>
                    </div>
                  </div>
                </address>

                <p className="text-foreground mt-10">
                  Din Mægler Roskilde, er din boligbutik i lokalområdet.
                </p>
              </section>
            </div>

            <div className="lg:col-span-7 lg:pl-20">
              <h3 className="text-primary text-xl font-bold">Quick Links</h3>
              <nav aria-label="Footer Navigation">
                <ul className="text-foreground mt-6 space-y-4">
                  <li>
                    <Link
                      to="/"
                      className="hover:text-primary transition-colors"
                    >
                      Boliger til salg
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-primary transition-colors"
                    >
                      Mæglere
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-primary transition-colors"
                    >
                      Kontakt os
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="hover:text-primary transition-colors"
                    >
                      Log ind / bliv bruger
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background pt-20 pb-16 lg:pt-32 lg:pb-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <section className="flex flex-col justify-end lg:col-span-7 lg:col-start-6 lg:pl-20">
              <div className="space-y-1">
                <p className="text-foreground/60 text-xs">Medlem af</p>
                <h2 className="text-foreground/60 text-4xl font-black">DMS</h2>
                <p className="text-foreground/60 text-xs">
                  Dansk Mægler Sammenslutning
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="bg-primary text-background py-6 text-center">
        <p className="text-sm opacity-80">Layout By Jit Banik 2020</p>
      </div>
    </footer>
  );
}
