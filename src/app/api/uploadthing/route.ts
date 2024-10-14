import { createRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './our-file-router'

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
})
