import { createUploadthing, type FileRouter } from 'uploadthing/next'

const upStore = createUploadthing()
const upProfile = createUploadthing()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = (req: Request) => ({ id: 'fakeId' })

export const ourFileRouter = {
  imagesProductShoppingStore: upStore({
    image: {
      maxFileSize: '2MB',
      maxFileCount: 4,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req)

      if (!user) throw new Error('Unauthorized')

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)

      return { uploadedBy: metadata.userId }
    }),

  imageProfileShoppingStore: upProfile({
    image: {
      maxFileSize: '2MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req)

      if (!user) throw new Error('Unauthorized')

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)

      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
