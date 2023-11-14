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
    <div className="flex lg:flex-row-reverse max-lg:flex-col items-center lg:items-start max-md:gap-4 md:h-[31rem] md:w-3/5 md:min-w-[50%]">
      <div className="flex h-[380px] w-full max-w-[80%] mx-auto items-center justify-center  duration-700 md:h-5/6 rounded-md p-1">
        <Image
          src={currentImage}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-full max-h-[90%] w-auto max-w-[90%] object-contain"
        />
      </div>

      <div className="flex lg:flex-col gap-2 px-2">
        {imageUrls.map((imageUrl) => (
          <button
            key={imageUrl}
            className={`flex h-[100px] w-full items-center justify-center rounded-lg bg-amber-50/60 hover:bg-amber-100 duration-700
                ${
                  imageUrl === currentImage &&
                  'border-2 border-solid border-amber-300 bg-amber-100'
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
              className="h-auto w-auto max-h-[70%] max-w-[80%] md:max-h-[40%] md:max-w-[50%]"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
