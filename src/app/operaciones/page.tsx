'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const OperacionesPage = () => {

  const [result, setResult] = useState<string>("")

  const handleOperation = (operation: string) => {
    const setA = (document.getElementById("set-a") as HTMLInputElement).value
    const setB = (document.getElementById("set-b") as HTMLInputElement).value

    const a = new Set(setA.split(",").map((x) => x.trim()))
    const b = new Set(setB.split(",").map((x) => x.trim()))

    let res: Set<string>

    switch (operation) {
      case "union":
        res = new Set([...a, ...b])
        break
      case "intersection":
        res = new Set([...a].filter((x) => b.has(x)))
        break
      case "difference":
        res = new Set([...a].filter((x) => !b.has(x)))
        break
      default:
        res = new Set()
    }

    setResult(Array.from(res).join(", "))
  }

  return (
    <div className="flex flex-col container items-center justify-center h-screen bg-background text-foreground">
      <div className="max-w-2xl w-full space-y-4">
        <h1 className="text-3xl font-bold text-center">Operaciones de Conjuntos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="set-a" className="block mb-2 font-medium">
              Conjunto A
            </label>
            <Input
              id="set-a"
              placeholder="Elementos del conjunto A separados por comas"
              className="block w-full rounded-md border-input bg-background p-2 text-foreground focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="set-b" className="block mb-2 font-medium">
              Conjunto B
            </label>
            <Input
              id="set-b"
              placeholder="Ingresa los elementos del conjunto B separados por comas"
              className="block w-full rounded-md border-input bg-background p-2 text-foreground focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button className="flex-1" onClick={() => handleOperation("union")}>
            Unión
          </Button>
          <Button className="flex-1" onClick={() => handleOperation("intersection")}>
            Intersección
          </Button>
          <Button className="flex-1" onClick={() => handleOperation("difference")}>
            Diferencia
          </Button>
        </div>
        <div className="bg-muted rounded-md p-4">
          <h2 className="text-xl font-bold mb-2">Resultado</h2>
          <pre className="whitespace-pre-wrap break-words">{result}</pre>
        </div>
      </div>
    </div>
  )
}

export default OperacionesPage