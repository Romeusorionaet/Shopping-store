'use client'

import { getCatalogBasicData } from '@/actions/get/catalog/get-data-catalog-basic-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { SkeletonSearchFormProducts } from '../skeletons/skeleton-search-form-products'

type CatalogBasicDataProps = {
  id: string
  title: string
}

export function FormSearchProducts() {
  const router = useRouter()

  const { data, isLoading, error } = useQuery({
    queryKey: ['productPromotionFiltered'],
    queryFn: () => getCatalogBasicData(),
  })

  if (isLoading) {
    return <SkeletonSearchFormProducts />
  }

  if (error) {
    return <p>error</p>
  }

  const categories: CatalogBasicDataProps[] = JSON.parse(
    data?.props.categoriesBasicData || '[]',
  )

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = event.currentTarget.q.value.toLowerCase()
    const categoryId = event.currentTarget.categoryId.value

    router.push(
      `/product-manage/product-listing?q=${query}&categoryId=${categoryId}&p=1`,
    )
  }

  return (
    <form onSubmit={handleSearch} className="mb-10 flex gap-6 max-md:flex-col">
      <select
        name="categoryId"
        className="w-32 rounded-lg bg-base_one_reference_header p-1 text-base_color_text_top"
      >
        <option value={0}>Selecione</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.title}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap justify-center gap-4">
        <Input
          type="text"
          placeholder="Nome do produto"
          name="q"
          className="bg-transparent p-2 md:w-[25rem]"
        />

        <Button
          type="submit"
          variant="secondary"
          className="rounded-md bg-base_one_reference_header p-1 text-xs text-base_color_text_top/80 duration-700 max-md:-mr-5"
        >
          Buscar
        </Button>
      </div>
    </form>
  )
}
