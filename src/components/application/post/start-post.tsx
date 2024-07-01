/* eslint-disable no-constant-condition */
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

export function StartPost() {
  return (
    <div className="bg-brand-zinc-900 p-8 rounded-md border-2 border-brand-zinc-700">
      <h1 className="font-semibold text-md text-zinc-500">Nova postagem</h1>
      <div className="flex items-center gap-5 mt-4">
        <img
          alt="Foto de Rafael dos Santos Pereira"
          src="https://github.com/rafaelppereira.png"
          className="size-12 rounded-md shrink-0 object-cover ring-4 ring-brand-blue-700 ring-offset-4 ring-offset-current"
        />

        <Dialog>
          <DialogTrigger asChild>
            <div className="h-14 text-md rounded-md items-center cursor-text flex flex-1 bg-brand-zinc-800 border-2 border-brand-zinc-700 pl-5 text-zinc-200 focus-visible:!ring-brand-blue-700 hover:ring-brand-blue-700 hover:ring-4 focus-visible:ring-offset-0 transition-all outline-none">
              <span>Comece uma publicação</span>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar uma publicação</DialogTitle>
              <DialogDescription>
                Dê vida a uma nova publicação para a comunidade AmiGU
              </DialogDescription>
            </DialogHeader>

            <Textarea
              placeholder="Sobre o que você quer falar?"
              className={`${false ? 'border-2 border-red-500 focus-visible:!ring-red-500' : 'border-2 border-brand-zinc-700 focus-visible:!ring-brand-blue-500'} bg-brand-zinc-900 resize-none text-md p-4 text-zinc-400 h-60 mt-2  focus-visible:ring-offset-0 transition-all outline-none`}
            />

            <DialogFooter>
              <Button
                type="button"
                className="bg-brand-blue-700 text-white hover:bg-brand-blue-700 hover:brightness-75 transition-all"
              >
                <Send className="size-4 mr-2" />
                Publicar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
