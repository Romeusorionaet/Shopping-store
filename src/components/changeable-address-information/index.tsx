import { Address } from '@prisma/client'

interface Props {
  address: Address
}

export function ChangeableAddressInformation({ address }: Props) {
  return (
    <div className="mt-4 flex flex-col gap-1 opacity-80 bg-blue-200/20 p-1 rounded-md">
      <h2 className="font-bold">Endereço de entrega</h2>

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
          <span className="font-bold">Número</span>: {address.number}
        </p>
        <p>
          <span className="font-bold">Complemento</span>: {address.complement}
        </p>
      </div>
    </div>
  )
}
