interface CardViewFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardViewFooter({ children, className }: CardViewFooterProps) {
  return (
    <footer className={`${className} flex items-center gap-4`}>
      {children}
    </footer>
  )
}
