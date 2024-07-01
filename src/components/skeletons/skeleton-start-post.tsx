import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonStartPost() {
  return (
    <div className="bg-brand-zinc-900 p-8 rounded-md border-2 border-brand-zinc-700">
      <Skeleton className="w-32 h-6" />
      <div className="flex items-center gap-5 mt-4">
        <Skeleton className="size-14 shrink-0" />

        <Skeleton className="w-full h-14" />
      </div>
    </div>
  )
}
