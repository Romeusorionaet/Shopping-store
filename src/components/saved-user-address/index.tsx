import { AddressFormData } from '@/app/address/components/form'

type OmitIdAndUserId<T> = Omit<T, 'id' | 'userId'>

export function SavedUserAddress({
  userAddress,
}: {
  userAddress: OmitIdAndUserId<AddressFormData>
}) {
  return (
    <div>
      <p>{userAddress.cep}</p>
      <p>{userAddress.city}</p>
      <p>{userAddress.uf}</p>
      <p>{userAddress.neighborhood}</p>
      <p>{userAddress.street}</p>
      <p>{userAddress.number}</p>
      <p>{userAddress.complement}</p>
      <p>{userAddress.username}</p>
      <p>{userAddress.phoneNumber}</p>
      <p>{userAddress.email}</p>
    </div>
  )
}
