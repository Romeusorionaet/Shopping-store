import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getDataUserAddress } from '@/actions/get/user/get-data-user-address'
import { createUserAddress } from '@/actions/register/address'
import { updateUserAddress } from '@/actions/update/address'
import { useNotification } from '@/hooks/use-notifications'
import { Check, ShieldAlert } from 'lucide-react'
import { AddressFormData } from '@/app/(store)/address/schemas/address-form-schema'
import { hasDataChangedDataAddress } from '@/app/(store)/address/helpers/has-changed-data-address'

const initialDataUserAddress = {
  username: '',
  email: '',
  phoneNumber: '',
  cep: 0,
  city: '',
  uf: '',
  street: '',
  neighborhood: '',
  houseNumber: 0,
  complement: '',
}

export function useAddressForm() {
  const { notifySuccess, notifyError } = useNotification()
  const { data } = useQuery({
    queryKey: ['addressData'],
    queryFn: getDataUserAddress,
  })

  const [oldAddress, setOldAddress] = useState(initialDataUserAddress)
  const hasUserAddress = !!oldAddress.username // boolean

  useEffect(() => {
    if (data?.userAddress) {
      setOldAddress(data.userAddress)
    }
  }, [data])

  async function handleAddressForm(addressFormData: AddressFormData) {
    const { isSameData } = hasDataChangedDataAddress(
      addressFormData,
      oldAddress,
    )

    if (isSameData) {
      notifyError({
        message: 'Não há alterações para salvar',
        origin: 'client',
      })
      return
    }

    if (hasUserAddress) {
      await updateExistingAddress(addressFormData)
    } else {
      await createNewAddress(addressFormData)
    }
  }

  async function createNewAddress(addressFormData: AddressFormData) {
    const result = await createUserAddress(addressFormData)

    if (result.success) {
      notifySuccess({ message: result.message, origin: 'server' })
      setOldAddress(addressFormData)
    } else {
      notifyError({ message: result.message, origin: 'server' })
    }
  }

  async function updateExistingAddress(addressFormData: AddressFormData) {
    const result = await updateUserAddress(addressFormData)

    if (result.success) {
      notifySuccess({ message: result.message, origin: 'server' })
      setOldAddress(addressFormData)
    } else {
      notifyError({ message: result.message, origin: 'server' })
    }
  }

  return {
    oldAddress,
    hasUserAddress,
    textButtonSubmitForm: hasUserAddress ? 'salvar alterações' : 'salvar',
    iconBasedOnAddress: hasUserAddress ? (
      <Check className="text-base_color_positive" />
    ) : (
      <ShieldAlert className="text-base_color_negative" />
    ),
    handleAddressForm,
  }
}
