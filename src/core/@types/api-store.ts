export enum ModeOfSale {
  SELLS_ONLY_IN_THE_REGION = 'SELLS_ONLY_IN_THE_REGION',
  ONLINE_STORE = 'ONLINE_STORE',
}

export enum OrderStatus {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
}

export enum OrderStatusTracking {
  WAITING = 'WAITING',
  CANCELED = 'CANCELED',
  PRODUCT_DELIVERED_TO_CARRIER = 'PRODUCT_DELIVERED_TO_CARRIER',
  PRODUCT_DELIVERED_TO_CLIENT = 'PRODUCT_DELIVERED_TO_CLIENT',
}

export interface ProfileProps {
  publicId: string
  username: string
  email: string
  picture: string
  createAt: string
  updateAt: string
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
  placeOfSale: string
  stars: number
  createdAt: Date
  updatedAt: Date | null
}

export interface TechnicalProductDetailsProps {
  id: string
  productId: string
  width: string
  height: string
  weight: string
  brand: string
  model: string
  ram: string
  rom: string
  videoResolution: string
  batteryCapacity: string
  screenOrWatchFace: string
  averageBatteryLife: string
  videoCaptureResolution: string
  processorBrand: string
  operatingSystem: string
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
  createdAt: Date
  updatedAt: Date | null
}

export interface OrderProductProps {
  id: string
  productId: string
  title: string
  imgUrl: string
  basePrice: number
  discountPercentage: number
  quantity: number
  productColor: string
}

export interface OrderProps {
  id: string
  buyerId: string
  trackingCode: string
  orderStatusTracking: string
  status: string
  buyerAddress: AddressProps
  orderProducts: OrderProductProps[]
  createdAt: Date
  updatedAt: Date | null
}

export interface NotificationProps {
  id: string
  title: string
  content: string
  createdAt: Date
  readAt: string | boolean
}
