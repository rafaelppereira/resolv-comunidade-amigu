import { Keyboard, Search, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function Header() {
  return (
    <header className="fixed left-0 z-50 top-0 w-full h-16 bg-header bg-brand-zinc-900/70 backdrop-blur-sm border-b-2 border-b-brand-zinc-700 flex items-center justify-center py-5 px-0">
      <div className="max-w-[90rem] w-full mx-auto flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <Button
            size="icon"
            className="text-zinc-300 bg-zinc-900 border-2 border-zinc-600 hidden lg:flex"
          >
            <Keyboard className="size-5" />
          </Button>
          <img
            src="amigu.png"
            alt="Logo AmiGU"
            className="h-8 pointer-events-none select-none"
          />
        </div>

        <div className="hidden lg:block relative">
          <Search className="absolute size-4 text-zinc-300 top-1/2 -translate-y-1/2 left-3" />
          <Input
            className="h-8 w-96 bg-brand-zinc-800 border-2 border-brand-zinc-700 pl-9 text-zinc-200 focus-visible:!ring-amigu focus-visible:ring-offset-0 transition-all outline-none"
            placeholder="Pesquisar..."
          />
        </div>

        <Button
          size="sm"
          className="bg-brand-blue-700 text-white hover:bg-brand-blue-700 px-3 hover:brightness-75 transition-all"
        >
          <User2 className="size-4 mr-2" />
          Entrar na conta
        </Button>
      </div>
    </header>
  )
}
