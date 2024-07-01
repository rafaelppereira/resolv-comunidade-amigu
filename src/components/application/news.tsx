import { Handshake } from 'lucide-react'
import { Button } from '../ui/button'
import { TooltipText } from './tooltip-text'
import { useQuery } from '@tanstack/react-query'
import { getAllNews } from '@/_api/get-all-news'
import { SkeletonNews } from '../skeletons/skeleton-news'

import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Skeleton } from '../ui/skeleton'

export function News() {
  const { data: newsData, isLoading: isLoadingNewsData } = useQuery({
    queryKey: ['news'],
    queryFn: getAllNews,
  })

  return (
    <div className="sticky top-[calc(2rem+4rem)] flex-col hidden 2xl:flex w-72">
      <div className="w-full bg-brand-zinc-900 shrink-0 rounded-t-md border-l-2 border-r-2 border-t-2 border-brand-zinc-700">
        <div className="p-6 border-b-2 border-b-brand-zinc-700">
          <h1 className="font-semibold text-lg tracking-tight">
            AmiGU Notícias
          </h1>
        </div>

        <div className="p-4 flex flex-col gap-2">
          {isLoadingNewsData
            ? Array.from({ length: 6 }).map((_, i) => {
                return <SkeletonNews key={i} />
              })
            : newsData &&
              newsData.map((item, i) => {
                return (
                  <TooltipText key={i} text={item.title}>
                    <div className="text-sm cursor-help hover:bg-brand-zinc-800 p-2 rounded-md transition-all">
                      <h2 className="font-semibold truncate">{item.title}</h2>
                      <time
                        dateTime=""
                        className="text-zinc-400 font-medium mt-1 block"
                      >
                        {formatDistance(new Date(item.createdAt), new Date(), {
                          locale: ptBR,
                        })}
                      </time>
                    </div>
                  </TooltipText>
                )
              })}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 rounded-b-md p-4 border-2 border-brand-zinc-700">
        {isLoadingNewsData ? (
          <Skeleton className="w-full h-10" />
        ) : (
          <Button
            type="button"
            className="w-full bg-brand-blue-700 hover:bg-brand-blue-700 hover:brightness-75 transition-all text-white"
          >
            <Handshake className="size-4 mr-2" />
            Quero ser AmiGU
          </Button>
        )}
      </div>
    </div>
  )
}
