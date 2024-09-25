interface CardViewContentProps {
  children: React.ReactNode
  className?: string
}

export function CardViewContent({ children, className }: CardViewContentProps) {
  return <div className={`${className} text-2xl`}>{children}</div>
}
