/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '@/lib/axios'

interface GetAllNewsResponse {
  id: string
  title: string
  createdAt: string
}

export async function getAllNews() {
  const response = await api.get<GetAllNewsResponse[]>('/news')

  return response.data.reverse()
}
