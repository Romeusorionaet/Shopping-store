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
        <AccordionTrigger className="flex justify-between w-full">
          <p>Atualizar produto</p>{' '}
          <span className="font-bold">{listOfProducts.length}</span>
        </AccordionTrigger>
        <AccordionContent>
          <Input
            type="text"
            value={searchTerm}
            className="border border-green-500 my-8"
            placeholder="Nome do produto..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-col gap-4 h-96 overflow-y-auto p-2 bg-zinc-200/5 scrollbar">
            {filteredProducts.map((product) => {
              return (
                <div
                  className="border-b border-white pb-4 flex justify-between gap-4"
                  key={product.id}
                >
                  <div className="space-y-2 w-full max-w-[50%] max-sm:text-sm flex flex-col justify-center">
                    <h3 className="font-bold">{product.name}</h3>
                    <p>
                      Valor bruto R${' '}
                      <span className="font-bold opacity-80">
                        {Number(product.basePrice)}
                      </span>
                    </p>
                    <p>
                      Disconto{' '}
                      <span className="font-bold opacity-80">
                        {Number(product.discountPercentage)}
                      </span>
                      %
                    </p>

                    <Link
                      className="border bg-amber-100 hover:bg-amber-200 duration-700 p-2 rounded-md text-zinc-950 text-center w-32"
                      href={`/control-adm/update-product/${product.slug}`}
                    >
                      Iniciar edição
                    </Link>
                  </div>

                  <div className="h-[200px] w-full max-w-[50%]">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-full max-h-[90%] w-full object-contain"
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
