import { Category } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/catalog/category/${category.slug}`}>
      <div className="flex flex-col items-center justify-center gap-2 w-60 rounded-lg py-2 bg-base_reference_card/60 hover:bg-base_reference_card_hover duration-700">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-52 object-contain"
          src={category.imageUrl}
          alt={category.name}
        />
        <p className="text-xs font-bold">{category.name}</p>
      </div>
    </Link>
  )
}
