'use client'

import { deleteCategory } from '@/actions/delete/category'
import { updateCategory } from '@/actions/update/category'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { Input } from '@/components/ui/input'
import { UploadButton } from '@uploadthing/react'
import Image from 'next/image'
import { useState } from 'react'

interface ImageDataProps {
  fileUrl: string
  fileName: string
}

interface DataUpdateProps {
  id: string
  name: string
  slug: string
  imageUrl: string
}

interface Props {
  listOfCategory:
    | {
        id: string
        name: string
        slug: string
        imageUrl: string
      }[]
    | undefined
}

export function AreaUpdateCategory({ listOfCategory }: Props) {
  const [imageDataCategory, setImageDataCategory] = useState<ImageDataProps[]>([
    { fileName: '', fileUrl: '' },
  ])

  const [idFile, setIdFile] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingProductId, setEditingProductId] = useState('')

  const handleDeleteCategory = async (categoryId: string) => {
    alert(
      'Todos os produtos registrado nessa categoria irão ser deletados, deseja continuar?',
    )
    try {
      const result = await deleteCategory(categoryId)
      alert(result?.message)
    } catch (err) {
      console.error(err)
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
          imageUrl: imageDataCategory[0].fileUrl || dataUpdate.imageUrl,
        }
        console.log(updatedData)

        const result = await updateCategory({ updatedData })
        alert(result?.message)
      } else {
        alert('Este produto não esta habilidato para edição.')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h2>Controle do catálogo. Atualizar / Deletar</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {listOfCategory &&
          listOfCategory.map((value) => {
            const isEditing = editingProductId === value.id
            return (
              <div key={value.id}>
                <div className="h-[6rem] flex justify-center items-center">
                  <UploadButton<OurFileRouter>
                    endpoint="imageShoppingStore"
                    onClientUploadComplete={(res) => {
                      res && setImageDataCategory(res)
                      setIdFile(value.id)
                      alert('Imagem da categoria salva no banco Uploadthing!')
                    }}
                    onUploadError={(error: Error) => {
                      alert(`ERROR! ${error.message}`)
                    }}
                    className="bg-green-800 p-1 text-xs rounded-md"
                  />

                  {imageDataCategory[0].fileUrl ? (
                    idFile === value.id ? (
                      <Image
                        width={200}
                        height={200}
                        className="h-full w-auto"
                        src={imageDataCategory[0].fileUrl}
                        alt={imageDataCategory[0].fileName}
                      />
                    ) : (
                      <Image
                        width={200}
                        height={200}
                        className="h-full w-auto"
                        src={value.imageUrl}
                        alt={value.name}
                      />
                    )
                  ) : (
                    <Image
                      width={200}
                      height={200}
                      className="h-full w-auto"
                      src={value.imageUrl}
                      alt={value.name}
                    />
                  )}
                </div>

                <div>
                  <Input
                    className="text-xs text-center text-zinc-950 bg-zinc-400"
                    defaultValue={value.name}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteCategory(value.id)}
                    className="bg-red-600 p-1 rounded-md"
                  >
                    Deletar
                  </button>
                  <button
                    onClick={() => handleUpdateCategory(value)}
                    className="bg-green-600 p-1 rounded-md"
                  >
                    Atualizar
                  </button>

                  <button
                    data-editing={isEditing}
                    onClick={() => {
                      setEditingProductId(value.id)
                    }}
                    className="bg-red-500 p-1 rounded-md data-[editing=true]:bg-green-500"
                  >
                    {isEditing ? 'Habilitado' : 'Habilitar Edição'}
                  </button>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
