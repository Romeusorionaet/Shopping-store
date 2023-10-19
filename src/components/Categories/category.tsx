import { Category } from '@prisma/client'

interface CategoryItemProps {
  categoryList: Category[] | undefined
}

export function CategoryItem({ categoryList }: CategoryItemProps) {
  return (
    <div>
      {categoryList &&
        categoryList.map((category) => {
          return (
            <div key={category.id}>
              <p>{category.name}</p>
            </div>
          )
        })}
    </div>
  )
}
