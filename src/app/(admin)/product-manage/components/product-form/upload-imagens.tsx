import { BaseUrl } from '@/constants/base-url'
import { useNotification } from '@/hooks/use-notifications'
import { UploadButton } from '@/utils/generate-components'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  imagesProduct: string[]
  setImagesProduct: Dispatch<SetStateAction<string[]>>
}

export function UploadImages({ imagesProduct, setImagesProduct }: Props) {
  const { notifyError, notifySuccess } = useNotification()

  const handleUploadComplete = (res: any) => {
    const currentImageCount = imagesProduct.length
    const remainingSlots = 4 - currentImageCount

    if (remainingSlots > 0) {
      const newImages = res
        .slice(0, remainingSlots)
        .map((image: { key: string }) => image.key)

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

  const handleRemoveImage = (imageToRemove: string) => {
    setImagesProduct((prevImages) =>
      prevImages.filter((img) => img !== imageToRemove),
    )
  }

  const maxLimitImage = imagesProduct.length === 4

  return (
    <div>
      <div data-value={maxLimitImage} className="data-[value=true]:hidden">
        <UploadButton
          className="mt-4 ut-button:bg-base_one_reference_header ut-button:ut-uploading:bg-red-500/50"
          endpoint="imagesProductShoppingStore"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => {
            notifyError({ message: error.message, origin: 'client' })
          }}
        />
      </div>

      <div className="flex flex-wrap border border-black/20">
        {imagesProduct.map((img) => {
          return (
            <div
              key={img}
              className="relative cursor-pointer"
              onClick={() => handleRemoveImage(img)}
            >
              <Image
                width={100}
                height={100}
                src={`${BaseUrl.IMG}/${img}`}
                alt=""
                className="h-8 w-8"
              />
              <span className="absolute right-0 top-0 rounded-full bg-red-500 px-1 text-xs text-white">
                x
              </span>
            </div>
          )
        })}
      </div>
      {imagesProduct.length > 0 && (
        <p className="text-center text-xs font-bold">
          {imagesProduct.length}/4
        </p>
      )}
    </div>
  )
}
