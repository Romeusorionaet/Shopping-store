import { AddressProps } from '@/core/@types/api-store'

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
        <p>
          <span className="font-bold">Nome</span>: {address.username}
        </p>
        <p>
          <span className="font-bold">Email</span>: {address.email}
        </p>
        <p>
          <span className="font-bold">Contanto</span>: {address.phoneNumber}
        </p>
        <p>
          <span className="font-bold">CEP</span>: {address.cep}
        </p>
        <p>
          <span className="font-bold">Cidade</span>: {address.city}
        </p>
        <p>
          <span className="font-bold">UF</span>: {address.uf}
        </p>
        <p>
          <span className="font-bold">Bairro</span>: {address.neighborhood}
        </p>
        <p>
          <span className="font-bold">Rua</span>: {address.street}
        </p>
        <p>
          <span className="font-bold">Número</span>: {address.houseNumber}
        </p>
        <p>
          <span className="font-bold">Complemento</span>: {address.complement}
        </p>
      </div>
    </div>
  )
}
