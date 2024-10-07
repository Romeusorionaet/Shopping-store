'use client'

import { getDataUserAddress } from '@/actions/get/user/get-data-user-address'
import { createUserAddress } from '@/actions/register/address'
import { updateUserAddress } from '@/actions/update/address'
import { AddressProps } from '@/core/@types/api-store'
import { useNotification } from '@/hooks/use-notifications'
import { AddressFormData } from '@/schemas/address-form-schema'
import { checkDataEquality } from '@/utils/check-data-equality'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Check, ShieldAlert } from 'lucide-react'
import { ReactNode, createContext } from 'react'

interface AddressFormContextType {
  isLoading: boolean
  oldAddress: AddressProps | null | undefined
  textButtonSubmitForm: string
  iconBasedOnAddress: JSX.Element
  handleAddressForm: (addressFormData: AddressFormData) => Promise<void>
}

interface AddressFormContextProps {
  children: ReactNode
}

export const AddressFormContext = createContext({} as AddressFormContextType)

export function AddressFormContextProvider({
  children,
}: AddressFormContextProps) {
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
        await refetch()

        return
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

  return (
    <AddressFormContext.Provider
      value={{
        isLoading,
        oldAddress: data?.userAddress,
        textButtonSubmitForm,
        iconBasedOnAddress,
        handleAddressForm,
      }}
    >
      {children}
    </AddressFormContext.Provider>
  )
}
