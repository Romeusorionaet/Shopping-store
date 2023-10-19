import { Category } from '@prisma/client'
import Link from 'next/link'

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="flex items-center justify-center gap-2 rounded-lg py-3">
        <span className="text-xs font-bold">{category.name}</span>
        <img src={category.imageUrl} alt="" />
      </div>
    </Link>
  )
}

export default CategoryItem
