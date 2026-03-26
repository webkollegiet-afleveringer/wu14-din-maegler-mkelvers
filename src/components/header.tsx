import { useState } from "react";
import { Link } from "@tanstack/react-router";
import PaperPlane from "/svgs/paper-plane.svg";
import Phone from "/svgs/phone.svg";
import User from "/svgs/user.svg";
import Logo from "/svgs/logo.svg";
import Menu from "/svgs/menu.svg";
import Close from "/svgs/close.svg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-primary px-4 py-3 text-sm text-white sm:px-6">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="mailto:4000@dinmaegler.com"
              className="flex items-center gap-2 hover:underline"
            >
              <img src={PaperPlane} alt="" className="size-4" />
              <span className="sm:hidden">Mail</span>
              <span className="hidden sm:inline">4000@dinmaegler.com</span>
            </a>
            <a
              href="tel:+4570704000"
              className="flex items-center gap-2 hover:underline"
            >
              <img src={Phone} alt="" className="size-4" />
              <span className="sm:hidden">Telefon</span>
              <span className="hidden sm:inline">+45 7070 4000</span>
            </a>
          </div>

          <Link to="/" className="flex items-center gap-2 hover:underline">
            <img src={User} alt="" className="size-4" />
            Log ind
          </Link>
        </div>
      </header>

      <div>
        <nav className="mx-auto w-full max-w-4xl px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Link to="/">
              <img src={Logo} alt="Din Mægler" className="w-50" />
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <Link to="/" className="hover:underline">
                Boliger til salg
              </Link>
              <Link to="/" className="hover:underline">
                Mæglere
              </Link>
              <Link to="/" className="hover:underline">
                Mine favoritter
              </Link>
              <Link to="/" className="hover:underline">
                Kontakt os
              </Link>
            </div>

            <button
              className="p-2 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <img src={menuOpen ? Close : Menu} alt="" className="size-6" />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-foreground/20 border-t bg-white md:hidden">
            <div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-2">
              <Link to="/" className="hover:underline">
                Boliger til salg
              </Link>
              <Link to="/" className="hover:underline">
                Mæglere
              </Link>
              <Link to="/" className="hover:underline">
                Mine favoritter
              </Link>
              <Link to="/" className="hover:underline">
                Kontakt os
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
