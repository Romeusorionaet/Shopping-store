'use client'

import { Input } from '@/components/ui/input'
import { Product } from '@prisma/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  listOfProducts: Product[]
}

export function AreaUpdateProduct({ listOfProducts }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = listOfProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Accordion
      type="single"
      collapsible
      className="border border-zinc-500/60 my-10 p-2 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Atualizar produto</AccordionTrigger>
        <AccordionContent>
          <Input
            type="text"
            value={searchTerm}
            className="border border-white my-8"
            placeholder="Nome do produto..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-col gap-4 h-96 overflow-y-auto p-2 bg-zinc-200/5">
            {filteredProducts.map((product) => {
              return (
                <div
                  className="border-b border-white pb-4 flex justify-between gap-2"
                  key={product.id}
                >
                  <div className="space-y-2">
                    <h3 className="font-bold">{product.name}</h3>
                    <p>
                      Valor bruto{' '}
                      <span className="font-bold opacity-80">
                        {Number(product.basePrice)}
                      </span>
                    </p>
                    <p>
                      Disconto{' '}
                      <span className="font-bold opacity-80">
                        {Number(product.discountPercentage)}
                      </span>
                    </p>

                    <Link
                      className="bg-green-500/40 text-sm inline-block p-2 rounded-md border-b border-zinc-500/60 duration-700 hover:bg-green-500"
                      href={`/control-adm/update-product/${product.slug}`}
                    >
                      Iniciar edição
                    </Link>
                  </div>

                  <div className="h-[6rem]">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full w-auto"
                      src={product.imageUrls[0]}
                      alt={product.name}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
