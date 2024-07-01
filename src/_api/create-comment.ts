import { api } from '@/lib/axios'
import { v4 as randomUUID } from 'uuid'

interface CreateCommentQuery {
  postId: string
  name: string
  avatarUrl: string
  content: string
}

export async function createComment({
  postId,
  name,
  avatarUrl,
  content,
}: CreateCommentQuery) {
  await api.post('/comments', {
    id: randomUUID(),
    postId,
    author: {
      name,
      avatarUrl,
    },
    content,
    likes: 0,
    subcomments: [],
    createdAt: new Date().toISOString(),
  })
}
