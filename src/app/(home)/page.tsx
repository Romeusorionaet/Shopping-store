import { CategoryItem } from '@/components/Categories/category'
import { prismaClient } from '@/lib/prisma'

export default async function Home() {
  // for username, use client component
  // const { data } = useSession()
  // console.log(data)

  const categoryList = await getData()

  return (
    <div>
      {/* {data?.user?.name && (
        <h1>Seja bem vindo {data?.user?.name} ao shopping store</h1>
      )} */}

      <div className="bg-red-700 w-2/4 h-[26rem] max-auto">
        <p>banner de promoção aqui</p>
      </div>

      <CategoryItem categoryList={categoryList.props?.categoryList} />
    </div>
  )
}

export const getData = async () => {
  const categoryList = await prismaClient.category.findMany({})

  if (!categoryList) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categoryList,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
