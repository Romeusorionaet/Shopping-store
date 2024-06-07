interface AddressFieldProps {
  label: string
  value: string | number
}

export function AddressField({ label, value }: AddressFieldProps) {
  return (
    <p>
      <span className="font-bold">{label}</span>: {value}
    </p>
  )
}
