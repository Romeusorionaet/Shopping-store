import { AddressProps } from '@/core/@types/api-store'
import Link from 'next/link'

interface Props {
  address: AddressProps | null
}

export function ChangeableAddressInformation({ address }: Props) {
  if (!address) {
    return (
      <div className="rounded-md border border-white/20 p-4">
        <p>
          Não podemos exibir os dados do endereço temporário no momento. No
          entanto, seus dados estão salvos. Isso pode ter ocorrido se você
          limpou os cookies do seu navegador ou acessou por um navegador
          diferente. Se deseja visualizar o endereço temporário, por favor,
          envie novamente o formulário de endereço. Você pode realizar
          alterações desejadas até 5 dias após a confirmação da entrega.
        </p>
        <Link className="text-blue-500" href="/address">
          Endereço de entrega.
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-4 flex flex-col gap-1 rounded-md bg-blue-200/20 p-1 opacity-80">
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
          <span className="font-bold">Número</span>: {address.phoneNumber}
        </p>
        <p>
          <span className="font-bold">Complemento</span>: {address.complement}
        </p>
      </div>
    </div>
  )
}
