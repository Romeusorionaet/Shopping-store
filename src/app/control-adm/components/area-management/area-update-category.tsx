'use client'

import { deleteCategory } from '@/actions/delete/category'
import { updateCategory } from '@/actions/update/category'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UploadButton } from '@/utils/generate-components'
import { Product } from '@prisma/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { ArrowBigRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { DialogConfirmOrNot } from '../dialog-confirm-or-not'
import { useNotification } from '@/hooks/use-notifications'

interface ImageDataProps {
  name: string
  url: string
}

interface DataUpdateProps {
  id: string
  name: string
  slug: string
  imageUrl: string
}

interface Props {
  listOfCategory: {
    id: string
    name: string
    slug: string
    imageUrl: string
  }[]
  listOfProducts: Product[]
}

export function AreaUpdateCategory({ listOfCategory, listOfProducts }: Props) {
  const [imageDataCategory, setImageDataCategory] = useState<ImageDataProps[]>([
    { name: '', url: '' },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const [idFile, setIdFile] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingProductId, setEditingProductId] = useState('')

  const { notifySuccess, notifyError, notifyWarning } = useNotification()

  const filteredCategory = listOfCategory.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const result = await deleteCategory(categoryId)

      if (result.messageSuccess) {
        notifySuccess(result.messageSuccess)

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else if (result.messageError) {
        notifyError(result.messageError)
      }
    } catch (err) {
      notifyError(String(err))
    }
  }

  const handleUpdateCategory = async (dataUpdate: DataUpdateProps) => {
    const newSlug = newCategoryName.toLowerCase().replace(/ /g, '-')
    const newCategoryNameChanged =
      newCategoryName.charAt(0).toUpperCase() + newCategoryName.slice(1)

    try {
      if (editingProductId === dataUpdate.id) {
        const updatedData = {
          ...dataUpdate,
          name: newCategoryNameChanged || dataUpdate.name,
          slug: newSlug || dataUpdate.slug,
          imageUrl: imageDataCategory[0].url || dataUpdate.imageUrl,
        }

        const result = await updateCategory({ updatedData })

        if (result.messageSuccess) {
          notifySuccess(result.messageSuccess)
        } else if (result.messageError) {
          notifyError(result.messageError)
        }
      } else {
        notifyWarning('Este produto não está habilidato para edição.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="border border-white/20 my-10 p-2 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex justify-between w-full">
          <p>Atualizar categoria</p>
          <span className="font-bold border border-white p-1 rounded-full w-8">
            {listOfCategory.length}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <Input
            type="text"
            value={searchTerm}
            className="border border-base_color_positive my-8"
            placeholder="Nome da categoria..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap justify-center gap-4 h-96 overflow-y-auto p-2 scrollbar">
            {filteredCategory &&
              filteredCategory.map((category) => {
                const isEditing = editingProductId === category.id
                const filteredProductsForEachCategories = listOfProducts.filter(
                  (product) => product.categoryId === category.id,
                )

                return (
                  <div
                    key={category.id}
                    className="flex flex-col gap-4 mb-8 w-full border-b border-white/20 pb-8"
                  >
                    <div className="h-[6rem] flex flex-1 justify-between items-center sm:justify-evenly">
                      <div className="flex items-center">
                        <UploadButton
                          endpoint="imageShoppingStore"
                          onClientUploadComplete={(res) => {
                            res && setImageDataCategory(res)
                            setIdFile(category.id)
                            notifySuccess('Imagem da categoria salva')
                          }}
                          onUploadError={(error: Error) => {
                            notifyError(`ERROR! ${error.message}`)
                          }}
                        />
                        <ArrowBigRight />
                      </div>

                      <div>
                        {idFile === category.id ? (
                          imageDataCategory[0].url && (
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="h-full w-auto"
                              src={imageDataCategory[0].url}
                              alt={imageDataCategory[0].name}
                            />
                          )
                        ) : (
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-full h-28 object-contain"
                            src={category.imageUrl}
                            alt={category.name}
                          />
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Input
                        defaultValue={category.name}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                      <p className="text-xs">
                        Existe{' '}
                        <strong>
                          {filteredProductsForEachCategories.length}
                        </strong>{' '}
                        produto(s) cadastrado para nessa categoria.
                      </p>
                    </div>

                    <div className="flex gap-6 text-sm">
                      <DialogConfirmOrNot
                        onConfirm={() => handleDeleteCategory(category.id)}
                      />

                      <Button
                        onClick={() => handleUpdateCategory(category)}
                        className="text-base_color_dark"
                      >
                        Atualizar
                      </Button>

                      <Button
                        variant={'outline'}
                        data-editing={isEditing}
                        onClick={() => {
                          setEditingProductId(category.id)
                        }}
                        className="data-[editing=true]:bg-base_color_positive hover:text-base_color_dark"
                      >
                        {isEditing ? 'Habilitado' : 'Habilitar'}
                      </Button>
                    </div>
                  </div>
                )
              })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
