import { CarouselProducts } from '@/components/carousel-products'
import { SectionProductName } from '@/constants/section-product-name'
import { ProductProps } from '@/core/@types/api-store'

interface Props {
  products: string
}

export function SectionPromotion({ products }: Props) {
  const productPromotionFiltered: ProductProps[] = JSON.parse(products)

  const productsInOffers = productPromotionFiltered
    .filter((product) => product.discountPercentage >= 1)
    .sort(() => Math.random() - 0.5)

  return (
    <div>
      {productsInOffers.length !== 0 && (
        <div className="bg-white p-2">
          <h2 className="my-4 text-lg uppercase md:text-lg">Em promoção</h2>

          <CarouselProducts
            section={SectionProductName.DISCOUNT_PERCENTAGE}
            products={productsInOffers}
          />
        </div>
      )}
    </div>
  )
}
