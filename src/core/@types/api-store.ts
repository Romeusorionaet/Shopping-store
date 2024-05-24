export enum ModeOfSale {
  'SELLS_ONLY_IN_THE_REGION',
  'ONLINE_STORE',
}

export enum OrderStatus {
  'WAITING_FOR_PAYMENT',
  'PAYMENT_CONFIRMED',
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

export interface OrderProduct {
  id: string
  productId: string
  basePrice: number
  discountPercentage: number
  quantity: number
  productColor: string[]
}

export interface OrderProps {
  id: string
  buyerId: string
  trackingCode: string
  orderStatusTracking: string
  status: string
  buyerAddress: AddressProps
  orderProducts: OrderProduct[]
  createAt: Date
  updateAt: Date | null
}
