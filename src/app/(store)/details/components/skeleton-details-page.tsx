export function SkeletonDetailsPage() {
  return (
    <div className="flex h-screen flex-col items-center gap-8 pt-28">
      <div className="flex h-3/4 w-full gap-10 max-md:flex-col">
        <div className="h-full w-full animate-pulse rounded-md bg-zinc-100" />
        <div className="h-full w-full animate-pulse rounded-md bg-zinc-100" />
      </div>

      <div className="h-1/3 w-full animate-pulse rounded-md bg-zinc-100" />
    </div>
  )
}
