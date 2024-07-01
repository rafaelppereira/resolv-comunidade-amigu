/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
import { Loader2, MessagesSquare, Send } from 'lucide-react'
import { TooltipText } from '../tooltip-text'
import { Button } from '../../ui/button'
import { Textarea } from '../../ui/textarea'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMutation } from '@tanstack/react-query'
import { getCommentsByPost } from '@/_api/get-comments-by-post'
import { Comment } from './comment'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { createComment } from '@/_api/create-comment'

import { toast } from 'sonner'

interface PostProps {
  post: {
    id: string
    author: {
      avatarUrl: string
      name: string
      role: string
    }
    content: {
      type: string
      content: string
    }[]
    createdAt: string
  }
}

const createCommentFormData = z.object({
  comment: z
    .string({ required_error: 'Por favor digite seu comentário' })
    .nonempty({ message: 'Por favor digite seu comentário' }),
})

type CreateCommentFormData = z.infer<typeof createCommentFormData>

export function Post({ post }: PostProps) {
  const {
    data: commentsDataByPost,
    mutateAsync: getCommentsByPostFn,
    isPending: isPendingGetCommentsByPost,
  } = useMutation({
    mutationFn: getCommentsByPost,
  })

  const { mutateAsync: createCommentFn } = useMutation({
    mutationFn: createComment,
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCommentFormData>({
    resolver: zodResolver(createCommentFormData),
  })

  async function handleCreateComment(data: CreateCommentFormData) {
    await createCommentFn({
      name: 'Rafael Pereira',
      avatarUrl: 'https://github.com/rafaelppereira.png',
      content: data.comment,
      postId: post.id,
    })

    await getCommentsByPostFn({ postId: post.id })
    reset({
      comment: '',
    })
    toast.success('Comentário criado com sucesso!')
  }

  return (
    <article className="flex-1 bg-brand-zinc-900 p-8 rounded-md border-2 border-brand-zinc-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-7">
          <img
            src={post.author.avatarUrl}
            alt={`Foto de ${post.author.name}`}
            className="size-12 rounded-md object-cover ring-4 ring-brand-blue-700 ring-offset-4 ring-offset-current"
          />
          <div>
            <h1 className="text-white tracking-tight font-semibold text-xl">
              {post.author.name}
            </h1>
            <span className="text-zinc-400 text-sm font-medium">
              {post.author.role}
            </span>
          </div>
        </div>

        <time dateTime="" className="text-zinc-400 text-sm font-medium">
          {formatDistance(new Date(post.createdAt), new Date(), {
            locale: ptBR,
          })}
        </time>
      </header>

      <div className="py-10 text-zinc-300 text-lg">
        {post.content.map((c, i) => {
          if (c.type === 'paragraph') {
            return (
              <p key={i} className="pb-3">
                {c.content}
              </p>
            )
          } else if (c.type === 'link') {
            return (
              <a
                key={i}
                href={c.content}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline underline-offset-2"
              >
                {c.content}
              </a>
            )
          }
        })}
      </div>

      <form
        method="POST"
        className="space-y-4"
        onSubmit={handleSubmit(handleCreateComment)}
      >
        <footer>
          <h1 className="font-semibold text-md text-zinc-500">
            Deixe seu comentário
          </h1>

          <Textarea
            {...register('comment')}
            placeholder="Nossa, adorei o POST! Parabéns 😀"
            disabled={isPendingGetCommentsByPost || isSubmitting}
            className={`${errors.comment ? 'border-2 border-red-500 focus-visible:!ring-red-500' : 'border-0 focus-visible:!ring-brand-blue-500'} bg-brand-zinc-800 resize-none text-md p-4 text-zinc-400 h-36 mt-2  focus-visible:ring-offset-0 transition-all outline-none`}
          />

          {errors.comment && (
            <span className="text-red-500 text-sm block mt-2">
              {errors.comment.message}
            </span>
          )}
        </footer>

        <div className="flex items-center gap-3">
          <TooltipText text="Publicar comentário">
            <Button
              type="submit"
              disabled={isPendingGetCommentsByPost || isSubmitting}
              className="bg-brand-blue-700 text-white hover:bg-brand-blue-700 hover:brightness-75 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Send className="size-4 mr-2" />
              )}
              Publicar comentário
            </Button>
          </TooltipText>
        </div>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <TooltipText text="Clique para ver os comentários">
          <Button
            type="button"
            disabled={isPendingGetCommentsByPost}
            onClick={() => getCommentsByPostFn({ postId: post.id })}
            className="bg-transparent border-2 border-brand-zinc-800 hover:bg-brand-zinc-800 hover:brightness-75 transition-all text-white"
          >
            {isPendingGetCommentsByPost ? (
              <Loader2 className="size-4 mr-2 animate-spin" />
            ) : (
              <MessagesSquare className="size-4 mr-2" />
            )}
            Ver comentários
          </Button>
        </TooltipText>

        {commentsDataByPost && (
          <>
            {commentsDataByPost.length > 0 ? (
              <>
                {commentsDataByPost.map((comment, i) => {
                  return (
                    <Comment
                      key={i}
                      comment={comment}
                      getCommentsByPostFn={getCommentsByPostFn}
                    />
                  )
                })}
              </>
            ) : (
              <div className="flex justify-center text-sm text-amber-500">
                <p>Essa postagem ainda não possui comentários</p>
              </div>
            )}
          </>
        )}
      </div>
    </article>
  )
}
