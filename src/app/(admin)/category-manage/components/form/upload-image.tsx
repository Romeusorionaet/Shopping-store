import { useNotification } from '@/hooks/use-notifications'
import { UploadButton } from '@/utils/generate-components'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { BaseUrl } from '@/constants/base-url'
import { ImageCategoryProps } from './category-form'
import { ClientUploadedFileData } from 'uploadthing/types'

interface Props {
  imageCategory: ImageCategoryProps
  setImageCategory: Dispatch<SetStateAction<ImageCategoryProps>>
}

export function UploadImage({ imageCategory, setImageCategory }: Props) {
  const { notifyError, notifySuccess } = useNotification()

  const handleUploadComplete = (
    res: ClientUploadedFileData<{ uploadedBy: string }>[],
  ) => {
    if (res) {
      const uploadedFile = res[0]
      const { key: url, name } = uploadedFile

      setImageCategory({
        name,
        url,
      })

      notifySuccess({
        message: 'Imagem da categoria salvo',
        origin: 'client',
      })
    } else {
      notifyError({
        message: 'Permitido apenas 1 imagem.',
        origin: 'client',
      })
    }
  }

  return (
    <div>
      <div>
        <UploadButton
          className="mt-4 ut-button:bg-base_one_reference_header ut-button:ut-uploading:bg-red-500/50"
          endpoint="imageCategoryShoppingStore"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            notifyError({ message: error.message, origin: 'client' })
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        {imageCategory.url && (
          <Image
            width={300}
            height={300}
            src={`${BaseUrl.IMG}/${imageCategory.url}`}
            alt={imageCategory.name}
            className="h-16 w-16"
          />
        )}
      </div>
      {imageCategory.url && (
        <p className="text-center text-xs">Imagem a ser utilizado</p>
      )}
    </div>
  )
}
