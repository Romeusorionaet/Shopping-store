'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductImagesProps {
  name: string
  imageUrls: string[]
}

export function ProductImages({ imageUrls, name }: ProductImagesProps) {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])

  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }

  return (
    <div className="flex items-center max-lg:flex-col max-md:gap-4 md:h-[31rem] md:w-3/5 md:min-w-[50%] lg:flex-row-reverse lg:items-start">
      <div className="mx-auto flex h-[380px] w-full max-w-[80%] items-center justify-center  rounded-md p-1 duration-700 md:h-5/6">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-full max-h-[90%] w-auto max-w-[90%] object-contain"
        />
      </div>

      <div className="flex gap-2 px-2 lg:flex-col">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] w-full items-center justify-center rounded-lg bg-base_reference_card/60 duration-700 hover:bg-base_reference_card_hover
                ${
                  imageUrl === currentImage &&
                  'border-2 border-solid border-base_detail_decoration bg-base_reference_card_hover'
                }
            `}
            onClick={() => handleImageClick(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%] md:max-h-[40%] md:max-w-[50%]"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
