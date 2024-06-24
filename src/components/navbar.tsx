import Link from "next/link"
import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full h-16 flex flex-row justify-between border-b border-border bg-background z-50">
      <div className="container flex flex-row justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Tp matemática</h1>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <nav className="flex-row gap-4 hidden md:flex">
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
            <ThemeToggle />
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="flex md:hidden" variant="outline" size='icon'>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
            <SheetClose asChild>
              <Link
                href="/"
              >
                Dibujar diagramas
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href="/operaciones"
              >
                Operaciones
              </Link>
            </SheetClose>
            <ThemeToggle />
          </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar