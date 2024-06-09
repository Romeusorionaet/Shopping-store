import { CarouselProducts } from '@/components/carousel-products'
import { SectionProductName } from '@/constants/section-product-name'
import { ProductProps } from '@/core/@types/api-store'

interface Props {
  products: string
}

export function SectionPopular({ products }: Props) {
  const productPopularFiltered: ProductProps[] = JSON.parse(products)

  const topSellingProducts = productPopularFiltered
    .filter((product) => product.stars > 0)
    .sort(() => Math.random() - 0.5)

  return (
    <div>
      {topSellingProducts.length !== 0 && (
        <div className="bg-white p-2">
          <h2 className="my-4 text-lg uppercase md:text-lg">Mais populares</h2>

          <CarouselProducts
            section={SectionProductName.STARS}
            products={topSellingProducts}
          />
        </div>
      )}
    </div>
  )
}
