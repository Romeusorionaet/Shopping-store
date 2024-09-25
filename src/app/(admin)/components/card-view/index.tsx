interface CardViewProps {
  children: React.ReactNode
  className?: string
}

export function CardView({ children, className }: CardViewProps) {
  return (
    <article
      className={`flex h-56 w-56 flex-col justify-around rounded-lg bg-zinc-300 pl-4 ${className}`}
    >
      {children}
    </article>
  )
}
