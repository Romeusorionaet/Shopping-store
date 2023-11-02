'use client'

import React, { useState } from 'react'
import { UploadButton } from '@uploadthing/react'
import { OurFileRouter } from '../api/uploadthing/core'

interface ImageDataProps {
  fileName: string
  fileUrl: string
}

export default function Register() {
  const [imageData, setImageData] = useState<ImageDataProps>()
  console.log(imageData?.fileUrl)
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div>
      <main>
        <h1>Image Uploader</h1>

        <div>
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              res && setImageData(res[0])
              alert('Imagem salva no banco Uploadthing!')
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`)
            }}
            className="bg-green-500 p-2 w-40 m-auto rounded-md"
          />
        </div>

        <div>
          <p>{imageData && imageData.fileName}</p>
        </div>

        <form method="post" onSubmit={handleOnSubmit}>
          {imageData && (
            <img
              width={500}
              height={200}
              src={imageData.fileUrl}
              alt={imageData.fileUrl}
            />
          )}
        </form>
      </main>
    </div>
  )
}
