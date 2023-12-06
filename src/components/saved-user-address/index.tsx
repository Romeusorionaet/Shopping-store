import { AddressFormData } from '@/app/address/components/form'

type OmitIdAndUserId<T> = Omit<T, 'id' | 'userId'>

export function SavedUserAddress({
  userAddress,
}: {
  userAddress: OmitIdAndUserId<AddressFormData>
}) {
  return (
    <div className="mt-4 flex flex-col gap-1 opacity-80 bg-blue-200/20 p-1 rounded-md">
      <h2 className="font-bold">Endereço de entrega</h2>

      <div className="mt-2 text-sm">
        <p>
          <span className="font-bold">Nome</span>: {userAddress.username}
        </p>
        <p>
          <span className="font-bold">Email</span>: {userAddress.email}
        </p>
        <p>
          <span className="font-bold">Contanto</span>: {userAddress.phoneNumber}
        </p>
        <p>
          <span className="font-bold">CEP</span>: {userAddress.cep}
        </p>
        <p>
          <span className="font-bold">Cidade</span>: {userAddress.city}
        </p>
        <p>
          <span className="font-bold">UF</span>: {userAddress.uf}
        </p>
        <p>
          <span className="font-bold">Bairro</span>: {userAddress.neighborhood}
        </p>
        <p>
          <span className="font-bold">Rua</span>: {userAddress.street}
        </p>
        <p>
          <span className="font-bold">Número</span>: {userAddress.number}
        </p>
        <p>
          <span className="font-bold">Complemento</span>:{' '}
          {userAddress.complement}
        </p>
      </div>
    </div>
  )
}
