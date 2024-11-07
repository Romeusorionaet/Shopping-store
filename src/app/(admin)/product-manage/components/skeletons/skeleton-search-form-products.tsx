export function SkeletonSearchFormProducts() {
  return (
    <div className="mb-10 flex gap-6 max-md:flex-col">
      <div className="h-10 w-32 animate-pulse rounded-lg bg-base_one_reference_header/60 p-1 text-base_color_text_top" />

      <div className="flex flex-wrap justify-center gap-4">
        <div className="animate-pulse rounded-lg bg-zinc-200 p-2 md:w-[25rem]" />

        <div className="w-10 animate-pulse rounded-md bg-base_one_reference_header/60 p-1 text-xs text-base_color_text_top/80 duration-700 max-md:-mr-5" />
      </div>
    </div>
  )
}
