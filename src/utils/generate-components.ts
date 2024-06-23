import { OurFileRouter } from '@/app/api/uploadthing/our-file-router'
import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react'

export const UploadButton = generateUploadButton<OurFileRouter>()
export const UploadDropzone = generateUploadDropzone<OurFileRouter>()
