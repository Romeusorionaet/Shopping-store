import { AddressFormData } from '@/app/address/components/form'

type OmitIdAndUserId<T> = Omit<T, 'id' | 'userId'>

export function SavedUserAddress({
  userAddress,
}: {
  userAddress: OmitIdAndUserId<AddressFormData>
}) {
  return (
    <div className="mt-4 flex flex-col gap-1 opacity-80">
      <p>{userAddress.username}</p>
      <p>{userAddress.email}</p>
      <p>{userAddress.phoneNumber}</p>
      <p>{userAddress.cep}</p>
      <p>{userAddress.city}</p>
      <p>{userAddress.uf}</p>
      <p>{userAddress.neighborhood}</p>
      <p>{userAddress.street}</p>
      <p>{userAddress.number}</p>
      <p>{userAddress.complement}</p>
    </div>
  )
}
