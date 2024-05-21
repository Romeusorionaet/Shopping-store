export enum ModeOfSale {
  'SELLS_ONLY_IN_THE_REGION',
  'ONLINE_STORE',
}

export interface CategoryProps {
  id: string
  title: string
  imgUrl: string
  slug: string
  createdAt: Date
  updatedAt: Date | null
}

export interface ProductProps {
  id: string
  categoryId: string
  categoryTitle: string
  title: string
  slug: string
  description: string
  price: number
  imgUrlList: string[]
  corsList: string[]
  stockQuantity: number
  minimumQuantityStock: number
  discountPercentage: number
  width: number
  height: number
  weight: number
  placeOfSale: number
  stars: number
  createdAt: Date
  updatedAt: Date | null
}

export interface AddressProps {
  id: string
  buyerId: string
  orderId: string
  cep: number
  city: string
  uf: string
  street: string
  neighborhood: string
  houseNumber: number
  complement: string
  phoneNumber: string
  username: string
  email: string
  createAt: Date
  updateAt: Date | null
}
