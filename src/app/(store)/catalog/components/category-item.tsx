import { Category } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/catalog/category/${category.slug}`}>
      <div className="flex w-60 flex-col items-center justify-center gap-2 rounded-lg bg-base_reference_card/60 py-2 duration-700 hover:bg-base_reference_card_hover">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="h-52 w-full object-contain"
          src={category.imageUrl}
          alt={category.name}
        />
        <p className="text-xs font-bold">{category.name}</p>
      </div>
    </Link>
  )
}
