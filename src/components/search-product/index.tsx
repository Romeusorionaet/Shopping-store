'use client'

import { Input } from '../ui/input'
import { useState } from 'react'
import { CarouselProducts } from '../carousel-products'
import { Search } from 'lucide-react'
import { ProductProps } from '@/core/@types/api-store'

interface Props {
  products: ProductProps[]
}

export function SearchProduct({ products }: Props) {
  const [filteredProducts, setFilteredProducts] =
    useState<ProductProps[]>(products)
  const [searchItem, setSearchItem] = useState<string>('')

  const handleSearch = (searchValue: string) => {
    setSearchItem(searchValue)

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.categoryTitle.toLowerCase().includes(searchValue.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="mx-auto space-y-8">
      <div className="relative mx-auto max-w-2xl px-4">
        <Search className="absolute left-8 top-2 text-base_color_dark/20" />
        <Input
          className="w-full bg-base_color_dark/5 pl-14 "
          onChange={(e) => handleSearch(e.target.value)}
          value={searchItem}
          placeholder="Pesquise por nome ou categoria"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center">
          O produto <strong>{searchItem}</strong> não está disponível. Verifique
          se o nome está correto.
        </p>
      ) : (
        <CarouselProducts products={filteredProducts} />
      )}
    </div>
  )
}
