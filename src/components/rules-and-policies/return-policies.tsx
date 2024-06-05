'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

export function ReturnPolices() {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false)

  return (
    <Dialog open={isOpen}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="rounded-md p-1 underline duration-700"
      >
        Política de devolução
      </DialogTrigger>
      <DialogContent className="scrollbar h-2/3 overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Sobre a nossa política de devolução
          </DialogTitle>
        </DialogHeader>

        <Button
          variant="ghost"
          title="Fechar"
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2"
        >
          <X />
        </Button>

        <div>
          <p>
            Na Shopping Store, nos dedicamos a proporcionar a melhor experiência
            de compra para nossos clientes. Entendemos que, às vezes, um produto
            pode não atender às suas expectativas, por isso criamos uma política
            de devolução justa e transparente para garantir sua satisfação.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold">Prazo para devolução</h2>
          <p>
            Você pode devolver qualquer celular comprado em nossa loja em até 30
            dias corridos a partir da data de recebimento do pedido. Para que a
            devolução seja aceita, o produto deve atender às condições listadas
            abaixo.
          </p>

          <h2 className="font-bold">Condições para devolução</h2>
          <ul className="list-disc ">
            <li>
              <p>
                Em perfeito estado de conservação, sem sinais de uso ou danos.
              </p>
            </li>
            <li>
              <p>
                Com a embalagem original, incluindo todos os acessórios, manuais
                e materiais promocionais.
              </p>
            </li>
            <li>
              <p>Acompanhado da nota fiscal de compra.</p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold">Processo de Devolução</h2>
          <p>Para iniciar o processo de devolução, siga os passos abaixo:</p>

          <ul className="list-disc">
            <li>
              <p>
                Entre em contato com nossa equipe de atendimento ao cliente pelo
                e-mail: romeuindexjs@gmail.com ou telefone: (84) 981127596,
                informando o motivo da devolução e o número do pedido.
              </p>
            </li>
            <li>
              <p>
                Nossa equipe fornecerá as instruções para o envio do produto de
                volta para nosso centro de distribuição.
              </p>
            </li>
            <li>
              <p>
                Após o recebimento e análise do produto, você será notificado
                sobre a aprovação ou rejeição da devolução.
              </p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold">Reembolso</h2>
          <p>
            Se a devolução for aprovada, o reembolso será processado da seguinte
            maneira:
          </p>

          <ul className="list-disc">
            <li>
              <p>
                Pagamentos com cartão de crédito: o reembolso será efetuado na
                fatura do cartão, podendo levar até duas faturas para ser
                refletido, dependendo da operadora do cartão.
              </p>
            </li>
            <li>
              <p>
                Pagamentos via boleto bancário ou transferência: o reembolso
                será efetuado em até 10 dias úteis na conta bancária indicada
                pelo cliente.
              </p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold">Troca de Produtos</h2>
          <p>
            Caso prefira trocar o celular por outro modelo, entre em contato com
            nossa equipe de atendimento ao cliente. A troca está sujeita à
            disponibilidade de estoque e às mesmas condições de devolução
            descritas acima.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold">Produtos com Defeitos</h2>
          <p>
            Se o celular apresentar algum defeito de fabricação dentro do
            período de garantia, você pode solicitar a troca ou o reparo do
            produto. Para isso, entre em contato com nossa equipe de atendimento
            ao cliente, que fornecerá as orientações necessárias.
          </p>

          <h3 className="font-bold">Exceções</h3>
          <p>Não aceitamos devoluções de:</p>

          <ul className="list-disc">
            <li>
              <p>
                Produtos que apresentem sinais de uso inadequado ou danos
                causados pelo cliente.
              </p>
            </li>
            <li>
              <p>Produtos sem a embalagem original e acessórios completos.</p>
            </li>
            <li>
              <p>Produtos fora do prazo de devolução.</p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-bold">Atendimento ao Cliente</h2>
          <p>
            Nossa equipe de atendimento ao cliente está disponível para ajudar
            com qualquer dúvida ou solicitação. Entre em contato conosco pelo
            e-mail: romeuindexjs@gmail.com ou telefone: (84) 981127596 Na
            shopping Store, seu conforto e satisfação são nossa prioridade.
            Agradecemos por confiar em nós para suas compras de celulares.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
