/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TooltipText } from '../tooltip-text'
import { Button } from '@/components/ui/button'
import {
  CheckCircle,
  Loader2,
  Send,
  ThumbsUp,
  Trash,
  Undo2,
  XCircle,
} from 'lucide-react'

import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useMutation } from '@tanstack/react-query'
import { removeComment } from '@/_api/remove-comment'

import { toast } from 'sonner'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'

interface CommentProps {
  comment: {
    id: string
    postId: string
    author: {
      name: string
      avatarUrl: string
    }
    content: string
    likes: number
    createdAt: string
    subcomments: {
      id: string
      postId: string
      author: {
        name: string
        avatarUrl: string
      }
      content: string
      createdAt: string
    }[]
  }
  getCommentsByPostFn: ({ postId }: { postId: string }) => void
}

export function Comment({ comment, getCommentsByPostFn }: CommentProps) {
  const [hasToggleInputCreateSubComment, setHasToogleInputCreateSubComment] =
    useState(false)

  const { mutateAsync: removeCommentFn, isPending: isPendingRemoveComment } =
    useMutation({
      mutationFn: removeComment,
      onSuccess: () => {
        getCommentsByPostFn({ postId: comment.postId })
        toast.success('Comentário excluído com sucesso!')
      },
    })

  return (
    <div className="flex items-start gap-8">
      <div className="flex items-center gap-7 shrink-0 relative top-[0.5rem]">
        <img
          src={comment.author.avatarUrl}
          alt={`Foto de ${comment.author.name}`}
          className="size-12 rounded-md object-cover ring-4 ring-brand-blue-700 ring-offset-4 ring-offset-current"
        />
      </div>

      <div className="flex flex-col gap-3 w-full">
        <div className="bg-brand-zinc-800 w-full p-4 rounded-md relative">
          <div className="size-4 absolute -left-2 bg-brand-zinc-800 top-4 rotate-45" />
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white flex items-center gap-2 tracking-tight font-semibold text-xl">
                {comment.author.name}
              </h1>
              <span className="text-zinc-400 text-sm font-medium">
                {formatDistance(new Date(comment.createdAt), new Date(), {
                  locale: ptBR,
                })}
              </span>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="icon"
                  disabled={isPendingRemoveComment}
                  className="bg-red-500/70 text-white hover:bg-red-500/90 transition-all"
                >
                  {isPendingRemoveComment ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash className="size-4" />
                  )}
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir comentário</AlertDialogTitle>
                  <AlertDialogDescription>
                    Você tem certeza que deseja excluir esse comentário?
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="!justify-start mt-3">
                  <AlertDialogCancel
                    disabled={isPendingRemoveComment}
                    className="flex-1 bg-red-500 hover:bg-red-500 hover:brightness-75 transition-all"
                  >
                    <XCircle className="size-4 mr-2" />
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isPendingRemoveComment}
                    onClick={() => removeCommentFn({ commentId: comment.id })}
                    className="flex-1 bg-brand-blue-700 hover:bg-brand-blue-700 hover:brightness-75 transition-all text-white"
                  >
                    {isPendingRemoveComment ? (
                      <Loader2 className="size-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="size-4 mr-2" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <p className="mt-3 text-zinc-300 text-lg">{comment.content}</p>
        </div>

        <div className="flex items-center gap-3">
          <TooltipText text="Curtir comentário">
            <Button
              size="icon"
              className="bg-brand-blue-700 size-7 text-white hover:bg-red-500/90 transition-all"
            >
              <ThumbsUp className="size-4" />
            </Button>
          </TooltipText>

          <span className="text-zinc-400">Curtir - {comment.likes}</span>
        </div>

        {comment.subcomments.map((comment, i) => {
          return (
            <div key={i} className="flex items-start gap-8">
              <div className="flex items-center gap-7 shrink-0 relative top-[0.5rem]">
                <img
                  src={comment.author.avatarUrl}
                  alt={`Foto de ${comment.author.name}`}
                  className="size-10 rounded-md object-cover ring-4 ring-brand-blue-700 ring-offset-4 ring-offset-current"
                />
              </div>

              <div className="flex flex-col w-full items-start">
                <div className="bg-brand-zinc-800 w-full p-4 rounded-md relative">
                  <div className="size-4 absolute -left-2 bg-brand-zinc-800 top-4 rotate-45" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-white flex items-center gap-2 tracking-tight font-semibold text-md">
                        {comment.author.name}
                      </h1>
                      <span className="text-zinc-400 text-sm font-medium">
                        {formatDistance(
                          new Date(comment.createdAt),
                          new Date(),
                          {
                            locale: ptBR,
                          },
                        )}
                      </span>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          disabled={isPendingRemoveComment}
                          className="bg-red-500/70 text-white hover:bg-red-500/90 transition-all"
                        >
                          {isPendingRemoveComment ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            <Trash className="size-4" />
                          )}
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Excluir comentário
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Você tem certeza que deseja excluir esse comentário?
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter className="!justify-start mt-3">
                          <AlertDialogCancel
                            disabled={isPendingRemoveComment}
                            className="flex-1 bg-red-500 hover:bg-red-500 hover:brightness-75 transition-all"
                          >
                            <XCircle className="size-4 mr-2" />
                            Cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction
                            disabled={isPendingRemoveComment}
                            onClick={() =>
                              removeCommentFn({ commentId: comment.id })
                            }
                            className="flex-1 bg-brand-blue-700 hover:bg-brand-blue-700 hover:brightness-75 transition-all text-white"
                          >
                            {isPendingRemoveComment ? (
                              <Loader2 className="size-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="size-4 mr-2" />
                            )}
                            Confirmar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  <p className="mt-3 text-zinc-300 text-md">
                    {comment.content}
                  </p>
                </div>

                {hasToggleInputCreateSubComment ? (
                  <div className="w-full flex flex-col items-end">
                    <Button
                      size="sm"
                      type="button"
                      onClick={() =>
                        setHasToogleInputCreateSubComment(
                          !hasToggleInputCreateSubComment,
                        )
                      }
                      className="bg-transparant text-zinc-400 inline-flex w-full hover:bg-transparent hover:brightness-75 transition-all hover:underline hover:underline-offset-2"
                    >
                      <XCircle className="size-4 mr-2" />
                      Cancelar comentário
                    </Button>

                    <Textarea
                      placeholder="Digite seu comentário"
                      className={`${false ? 'border-2 border-red-500 focus-visible:!ring-red-500' : 'border-4 focus-visible:!ring-brand-blue-500'} h-28 bg-brand-zinc-900 resize-none text-md p-4 text-zinc-400 focus-visible:ring-offset-0 transition-all outline-none`}
                    />
                    <Button
                      size="sm"
                      type="button"
                      className="bg-brand-blue-700 mt-3 text-white hover:bg-brand-blue-700 hover:brightness-75 transition-all"
                    >
                      <Send className="size-4 mr-2" />
                      Publicar comentário
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    type="button"
                    onClick={() =>
                      setHasToogleInputCreateSubComment(
                        !hasToggleInputCreateSubComment,
                      )
                    }
                    className="bg-transparant text-zinc-400 inline-flex w-auto hover:bg-transparent hover:brightness-75 transition-all hover:underline hover:underline-offset-2"
                  >
                    <Undo2 className="size-4 mr-2" />
                    Responder comentário
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
