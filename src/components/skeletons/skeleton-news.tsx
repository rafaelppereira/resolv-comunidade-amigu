import { Skeleton } from '../ui/skeleton'

export function SkeletonNews() {
  return (
    <div className="text-sm cursor-help hover:bg-brand-zinc-800 p-2 rounded-md transition-all">
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-28 h-4 mt-2" />
    </div>
  )
}
