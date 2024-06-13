import ThemeToggle from "./theme-toggle"

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full h-16 flex flex-row justify-between border-b border-border bg-background z-50">
      <div className="container flex flex-row justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Tp matemática</h1>
        {/* <ThemeToggle /> */}
      </div>
    </header>
  )
}

export default Navbar