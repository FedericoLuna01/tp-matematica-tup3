'use client'

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()
  return (
    <Button
      size='icon'
      onClick={() => setTheme(theme === 'dark' ? "light" : "dark")}
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}

export default ThemeToggle