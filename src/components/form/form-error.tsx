interface Props {
  errors?: string
}

export function FormError({ errors }: Props) {
  return (
    <div className="h-1">
      {errors && <p className="text-base_color_negative text-xs">{errors}</p>}
    </div>
  )
}
