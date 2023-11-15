'use client'

import { deleteCategory } from '@/actions/delete/category'
import { updateCategory } from '@/actions/update/category'
import { OurFileRouter } from '@/app/api/uploadthing/core'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { UploadButton } from '@uploadthing/react'
import { ArrowBigRight, Trash } from 'lucide-react'
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
  listOfCategory: {
    id: string
    name: string
    slug: string
    imageUrl: string
  }[]
}

export function AreaUpdateCategory({ listOfCategory }: Props) {
  const [imageDataCategory, setImageDataCategory] = useState<ImageDataProps[]>([
    { fileName: '', fileUrl: '' },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const [idFile, setIdFile] = useState('')
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingProductId, setEditingProductId] = useState('')

  const filteredCategory = listOfCategory.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
    <Accordion
      type="single"
      collapsible
      className="border border-zinc-500/60 my-10 p-2 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Atualizar categoria</AccordionTrigger>
        <AccordionContent>
          <Input
            type="text"
            value={searchTerm}
            className="border border-green-500 my-8"
            placeholder="Nome da categoria..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="flex flex-wrap justify-center gap-4 h-96 overflow-y-auto p-2 bg-zinc-200/5 scrollbar">
            {filteredCategory &&
              filteredCategory.map((category) => {
                const isEditing = editingProductId === category.id
                return (
                  <div
                    key={category.id}
                    className="flex flex-col gap-4 mb-8 w-full border-b border-zinc-400 pb-8"
                  >
                    <div className="h-[6rem] flex flex-1 justify-between items-center sm:justify-evenly">
                      <div className="flex items-center">
                        <UploadButton<OurFileRouter>
                          endpoint="imageShoppingStore"
                          onClientUploadComplete={(res) => {
                            res && setImageDataCategory(res)
                            setIdFile(category.id)
                            alert(
                              'Imagem da categoria salva no banco Uploadthing!',
                            )
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`)
                          }}
                          className="bg-green-500/40 pb-2 w-[6rem] text-xs rounded-md text-center"
                        />
                        <ArrowBigRight />
                      </div>

                      <div>
                        {idFile === category.id ? (
                          imageDataCategory[0].fileUrl && (
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              className="h-full w-auto"
                              src={imageDataCategory[0].fileUrl}
                              alt={imageDataCategory[0].fileName}
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

                    <div>
                      <Input
                        defaultValue={category.name}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                    </div>

                    <div className="flex gap-6 text-sm">
                      <Button
                        variant={'destructive'}
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash size={28} />
                      </Button>
                      <Button
                        onClick={() => handleUpdateCategory(category)}
                        className="text-zinc-950"
                      >
                        Atualizar
                      </Button>

                      <Button
                        variant={'outline'}
                        data-editing={isEditing}
                        onClick={() => {
                          setEditingProductId(category.id)
                        }}
                        className="data-[editing=true]:bg-green-500 text-zinc-950"
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
