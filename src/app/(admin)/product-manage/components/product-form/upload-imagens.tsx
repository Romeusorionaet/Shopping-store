import { useNotification } from '@/hooks/use-notifications'
import { UploadButton } from '@/utils/generate-components'
import Image from 'next/image'
import { ImagesProductProps } from './form'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  imagesProduct: ImagesProductProps[]
  setImagesProduct: Dispatch<SetStateAction<ImagesProductProps[]>>
}

export function UploadImages({ imagesProduct, setImagesProduct }: Props) {
  const { notifyError, notifySuccess } = useNotification()

  const handleUploadComplete = (res: any) => {
    const currentImageCount = imagesProduct.slice(1).length
    const remainingSlots = 4 - currentImageCount

    if (remainingSlots > 0) {
      const newImages = res.slice(0, remainingSlots).map((image: any) => ({
        name: image.name,
        url: image.url,
      }))

      setImagesProduct((prevImages) => [...prevImages, ...newImages])

      notifySuccess({
        message: 'Imagem do produto salvo',
        origin: 'client',
      })
    } else {
      notifyError({
        message: 'O limite máximo de 4 imagens foi atingido.',
        origin: 'client',
      })
    }
  }

  const isMaxQuantityImages = imagesProduct.slice(1).length >= 4

  return (
    <div>
      <div
        data-value={isMaxQuantityImages}
        className="data-[value=true]:hidden"
      >
        <UploadButton
          className="mt-4 ut-button:bg-base_one_reference_header ut-button:ut-uploading:bg-red-500/50"
          endpoint="imagesProductShoppingStore"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            notifyError({ message: error.message, origin: 'client' })
          }}
        />
      </div>

      <div className="flex flex-wrap">
        {imagesProduct.slice(1).map((img, index) => {
          return (
            <Image
              width={100}
              height={100}
              key={index}
              src={img.url}
              alt={img.name}
              className="h-8 w-8"
            />
          )
        })}
      </div>
      {imagesProduct.length >= 5 && (
        <p className="text-xs">
          {imagesProduct.slice(1).length}: Imagens a serem utilizadas
        </p>
      )}
    </div>
  )
}
