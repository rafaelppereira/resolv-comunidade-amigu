import { api } from '@/lib/axios'

interface GetCommentsByPostQuery {
  postId: string
}

interface GetCommentsByPostResponse {
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

export async function getCommentsByPost({ postId }: GetCommentsByPostQuery) {
  const response = await api.get<GetCommentsByPostResponse[]>(
    `/comments?postId=${postId}`,
  )

  return response.data
}
