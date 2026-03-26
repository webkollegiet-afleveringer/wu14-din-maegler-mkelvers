import { useState } from "react"
import { Link } from "@tanstack/react-router"
import PaperPlane from "/svgs/paper-plane.svg"
import Phone from "/svgs/phone.svg"
import User from "/svgs/user.svg"
import Logo from "/svgs/logo.svg"
import Menu from "/svgs/menu.svg"
import Close from "/svgs/close.svg"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="bg-primary text-white text-sm px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between mx-auto max-w-4xl w-full">
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
        <nav className="py-4 max-w-4xl mx-auto w-full px-6">
          <div className="flex items-center justify-between w-full">
            <Link to="/">
              <img src={Logo} alt="Din Mægler" className="w-50" />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="hover:underline">Boliger til salg</Link>
              <Link to="/" className="hover:underline">Mæglere</Link>
              <Link to="/" className="hover:underline">Mine favoritter</Link>
              <Link to="/" className="hover:underline">Kontakt os</Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <img src={menuOpen ? Close : Menu} alt="" className="size-6" />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-foreground/20">
            <div className="flex flex-col max-w-4xl mx-auto w-full px-6 py-2">
              <Link to="/" className="hover:underline">Boliger til salg</Link>
              <Link to="/" className="hover:underline">Mæglere</Link>
              <Link to="/" className="hover:underline">Mine favoritter</Link>
              <Link to="/" className="hover:underline">Kontakt os</Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
