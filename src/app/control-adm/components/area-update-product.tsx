'use client'

import { Input } from '@/components/ui/input'
import { Product } from '@prisma/client'
import Link from 'next/link'
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
    <div className="space-y-8">
      <h2>Controle dos Produtos. Atualizar / Deletar</h2>

      <Input
        type="text"
        value={searchTerm}
        className="border border-white"
        placeholder="Nome do produto..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-4 ">
        {filteredProducts.map((value) => {
          return (
            <div
              className="border-t-4 border-white pt-4 flex flex-col gap-2"
              key={value.id}
            >
              <h3>{value.name}</h3>
              <p>{Number(value.basePrice)}</p>
              <p>{value.discountPercentage}</p>
              <p>{value.description}</p>

              <div className="flex gap-2">
                <Link
                  className="bg-green-500 p-1"
                  href={`/control-adm/update-product/${value.slug}`}
                >
                  Iniciar edição
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
