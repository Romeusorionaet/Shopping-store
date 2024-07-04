import { useMutation, useQuery } from '@tanstack/react-query'
import { getDataUserAddress } from '@/actions/get/user/get-data-user-address'
import { createUserAddress } from '@/actions/register/address'
import { updateUserAddress } from '@/actions/update/address'
import { useNotification } from '@/hooks/use-notifications'
import { Check, ShieldAlert } from 'lucide-react'
import { AddressFormData } from '@/app/(store)/address/schemas/address-form-schema'
import { checkDataEquality } from '@/utils/check-data-equality'

export function useAddressForm() {
  const { notifySuccess, notifyError } = useNotification()

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['addressData'],
    queryFn: () => getDataUserAddress(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  const mutation = useMutation({
    mutationFn: async ({
      addressFormData,
      operation,
    }: {
      addressFormData: AddressFormData
      operation: 'create' | 'update'
    }) => {
      const result =
        operation === 'create'
          ? await createUserAddress(addressFormData)
          : await updateUserAddress(addressFormData)

      if (result.success) {
        notifySuccess({ message: result.message, origin: 'server' })
        refetch()
      } else {
        notifyError({ message: result.message, origin: 'server' })
      }
    },
  })

  async function handleAddressForm(addressFormData: AddressFormData) {
    const previousAddress = data?.userAddress

    const { isSameData } = checkDataEquality(addressFormData, data?.userAddress)

    if (isSameData) {
      notifyError({
        message: 'Não há alterações para salvar',
        origin: 'client',
      })
      return
    }

    mutation.mutate({
      addressFormData,
      operation: previousAddress ? 'update' : 'create',
    })
  }

  const textButtonSubmitForm = data?.userAddress?.username
    ? 'salvar alterações'
    : 'salvar'

  const iconBasedOnAddress = data?.userAddress?.username ? (
    <Check className="text-base_color_positive" />
  ) : (
    <ShieldAlert className="text-base_color_negative" />
  )

  return {
    isLoading,
    oldAddress: data?.userAddress,
    textButtonSubmitForm,
    iconBasedOnAddress,
    handleAddressForm,
  }
}
