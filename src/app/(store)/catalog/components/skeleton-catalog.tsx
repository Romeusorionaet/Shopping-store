export function SkeletonCatalog() {
  return (
    <div className="my-8 flex flex-wrap justify-center gap-8 pt-40">
      {Array.from({ length: 12 }).map((_, index) => {
        return (
          <div
            key={index}
            className="h-60 w-60 animate-pulse rounded-md bg-zinc-100"
          />
        )
      })}
    </div>
  )
}
