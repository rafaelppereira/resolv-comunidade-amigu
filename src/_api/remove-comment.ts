import { api } from '@/lib/axios'

interface RemoveCommentQuery {
  commentId: string
}

export async function removeComment({ commentId }: RemoveCommentQuery) {
  await api.delete(`/comments/${commentId}`)
}
