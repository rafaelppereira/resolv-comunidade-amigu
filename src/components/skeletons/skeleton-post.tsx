import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonPost() {
  return (
    <article className="flex-1 bg-brand-zinc-900 p-8 rounded-md border-2 border-brand-zinc-700">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Skeleton className="size-16" />

          <div>
            <Skeleton className="h-6 w-44" />
            <Skeleton className="w-40 h-4 mt-2" />
          </div>
        </div>

        <Skeleton className="h-6 w-36" />
      </header>

      <div className="py-10 text-zinc-300 text-lg gap-3 flex flex-col">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-[90%]" />
        <Skeleton className="h-6 w-[80%]" />
      </div>

      <form method="POST" className="space-y-4">
        <footer>
          <Skeleton className="h-6 w-44" />

          <Skeleton className="h-36 w-full mt-2" />
        </footer>

        <div className="flex items-center gap-3">
          <Skeleton className="w-48 h-10" />

          <div>
            <Skeleton className="w-10 h-10" />
          </div>
        </div>
      </form>
    </article>
  )
}
