'use client'

import { Product } from '@prisma/client'
import { Input } from '../ui/input'
import { useState } from 'react'
import { CarouselProducts } from '../carousel-products'
import { Search } from 'lucide-react'

interface Props {
  products: Product[]
}

export function SearchProduct({ products }: Props) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue)
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="space-y-8 mx-auto">
      <div className="max-w-2xl relative mx-auto px-4">
        <Search className="absolute top-2 left-8 text-base_color_dark/20" />
        <Input
          className="bg-base_color_dark/5 px-14 w-full "
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          placeholder="Nome de algum produto"
        />
      </div>

      <CarouselProducts products={filteredProducts} />
    </div>
  )
}
