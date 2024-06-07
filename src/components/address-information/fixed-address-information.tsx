import { AddressProps } from '@/core/@types/api-store'
import { AddressField } from './address-field'

interface Props {
  address: AddressProps
}

export function FixedAddressInformation({ address }: Props) {
  return (
    <div className="mt-4 flex flex-col gap-1 rounded-md bg-blue-200/20 p-1 opacity-80">
      <div>
        <h2 className="font-bold">Endereço de entrega:</h2>
        <p>
          Quaisquer modificações feitas no endereço de entrega não serão
          refletidas aqui.
        </p>
      </div>

      <div className="mt-2 text-sm">
        <AddressField label="Nome" value={address.username} />
        <AddressField label="Email" value={address.email} />
        <AddressField label="Contato" value={address.phoneNumber} />
        <AddressField label="CEP" value={address.cep} />
        <AddressField label="Cidade" value={address.city} />
        <AddressField label="UF" value={address.uf} />
        <AddressField label="Bairro" value={address.neighborhood} />
        <AddressField label="Rua" value={address.street} />
        <AddressField label="Número" value={address.houseNumber} />
        <AddressField label="Complemento" value={address.complement} />
      </div>
    </div>
  )
}
