export function SkeletonAddressPage() {
  return (
    <div className="h-screen px-8 pt-72">
      <div className="h-8 w-1/3 animate-pulse rounded-md bg-zinc-100" />

      <div className="mx-auto mt-10 flex max-w-[800px] flex-col items-end gap-10">
        <div className="h-8 w-full animate-pulse rounded-md bg-zinc-100" />
        <div className="h-10 w-40 animate-pulse rounded-md bg-zinc-100" />
      </div>
    </div>
  )
}
