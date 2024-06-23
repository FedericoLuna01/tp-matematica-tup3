import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full h-16 flex flex-row justify-between border-b border-border bg-background z-50">
      <div className="container flex flex-row justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Tp matemática</h1>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <nav className="flex flex-row gap-4">
            <Button
              asChild
              variant='link'
            >
              <Link
                href="/"
              >
                Dibujar diagramas
              </Link>
            </Button>
            <Button
              asChild
              variant='link'
            >
              <Link
                href="/operaciones"
              >
                Operaciones
              </Link>
            </Button>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Navbar