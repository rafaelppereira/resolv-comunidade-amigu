import { Keyboard, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function Header() {
  return (
    <header className="w-full h-16 bg-header bg-zinc-800 border-b-2 border-b-zinc-800 flex items-center justify-center py-5 px-0">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className="text-zinc-300 bg-zinc-900 border-2 border-zinc-600"
          >
            <Keyboard className="size-5" />
          </Button>
          <img
            src="log-amigu.png"
            alt="logo amiGU"
            className="h-8 pointer-events-none select-none"
          />
        </div>
        <div className="relative">
          <Search className="absolute size-4 text-zinc-300 top-1/2 -translate-y-1/2 left-3" />
          <Input
            className="h-8 w-96 bg-zinc-900 border-none pl-9 text-zinc-200 focus-visible:!ring-amigu focus-visible:ring-offset-0 transition-all outline-none"
            placeholder="Pesquisar..."
          />
        </div>

        <Button size="sm" className="bg-zinc-900 px-5">
          Entrar na conta
        </Button>
      </div>
    </header>
  )
}
