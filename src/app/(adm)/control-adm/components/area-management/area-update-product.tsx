'use client'

import { Input } from '@/components/ui/input'
// import { Product } from '@prisma/client'
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
  // listOfProducts: Product[]
  listOfProducts: any
}

export function AreaUpdateProduct({ listOfProducts }: Props) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = listOfProducts.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Accordion
      type="single"
      collapsible
      className="my-10 rounded-md border border-white/20 p-2"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex w-full justify-between">
          <p>Atualizar produto</p>{' '}
          <span className="w-8 rounded-full border border-white p-1 font-bold">
            {listOfProducts.length}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Input
            type="text"
            value={searchTerm}
            className="my-8 border border-base_color_positive"
            placeholder="Nome do produto..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="scrollbar flex h-96 flex-col gap-4 overflow-y-auto p-2">
            {filteredProducts.map((product: any) => {
              return (
                <div
                  className="flex justify-between gap-4 border-b border-white pb-4"
                  key={product.id}
                >
                  <div className="flex w-full max-w-[50%] flex-col justify-center space-y-2 max-sm:text-sm">
                    <h3 className="font-bold">{product.name}</h3>
                    <p>
                      Valor R${' '}
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

                    <p>
                      Quantidade{' '}
                      <span className="font-bold opacity-80">
                        {product.quantity}
                      </span>
                    </p>

                    <Link
                      className="w-32 rounded-md border bg-base_reference_card_hover p-2 text-center text-base_color_dark duration-700 hover:bg-base_one_reference_header"
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
