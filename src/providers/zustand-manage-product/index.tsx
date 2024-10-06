import { createProduct } from '@/actions/register/products'
import { updateProduct } from '@/actions/update/product'
import { ProductFormData } from '@/app/(admin)/product-manage/components/product-form/form'
import { create } from 'zustand'

export interface ManageProduct {
  createOrUpdateProduct: (
    data: ProductFormData,
  ) => Promise<{ success: boolean; message: string }>
  setProductActionType: (isNewProduct: boolean) => void
  isNewProduct: boolean
}

export const useManageProduct = create<ManageProduct>((set, get) => ({
  isNewProduct: false,

  setProductActionType(isNewProduct) {
    set({ isNewProduct })
  },

  async createOrUpdateProduct(dataProduct) {
    const { isNewProduct } = get()

    if (isNewProduct) {
      return await createProduct({ product: dataProduct })
    } else {
      return await updateProduct({ product: dataProduct })
    }
  },
}))
