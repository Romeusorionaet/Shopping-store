import { CartProps } from '@/providers/zustand-store'

export interface CartItemProps {
  product: CartProps
  handleNavigateTo: (route: string) => void
}
