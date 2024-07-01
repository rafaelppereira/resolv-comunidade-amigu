/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'

interface CommentProps {
  id: string
  author: {
    name: string
    avatarUrl: string
  }
  content: string
  likes: number
}

interface GetAllPostsResponse {
  data: {
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
    comments: CommentProps[]
    createdAt: string
  }[]
  prev: null
  next: number
  last: number
  first: number
  pages: number
  items: number
}

export async function getAllPosts() {
  const response = await api.get<GetAllPostsResponse>(
    `/posts?_page=1&_per_page=10`,
  )

  return response.data.data
}
