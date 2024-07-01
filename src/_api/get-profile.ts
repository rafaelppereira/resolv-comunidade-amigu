/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'

interface GetProfileResponnse {
  name: string
  username: string
  email: string
  createdAt: string
  avatarUrl: string
  thumbnailUrl: string
}

export async function getProfile() {
  const response = await api.get<GetProfileResponnse>('/user')

  return response.data
}
