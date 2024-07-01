import { Skeleton } from '../ui/skeleton'

export function SkeletonUser() {
  return (
    <aside className="sticky top-[calc(2rem+4rem)] shrink-0 w-72 bg-brand-zinc-900 rounded-lg overflow-hidden border-2 border-brand-zinc-700">
      <Skeleton className="w-full h-24" />

      <div className="flex flex-col items-center">
        <Skeleton className="size-28 relative -top-12 rounded-full animate-none" />

        <div className="-mt-8 flex flex-col items-center">
          <Skeleton className="w-32 h-6" />
          <Skeleton className="w-24 h-3 mt-2" />
        </div>
      </div>

      <div className="border-t-2 border-t-brand-zinc-700 mt-6 flex items-center justify-center py-4">
        <Skeleton className="w-40 h-3 mt-2" />
      </div>
    </aside>
  )
}
