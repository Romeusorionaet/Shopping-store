interface Props {
  errors?: string
}

export function FormError({ errors }: Props) {
  return (
    <div className="h-1">
      {errors && <p className="text-red-500 text-xs">{errors}</p>}
    </div>
  )
}
