import { APP_ROUTES } from '@/constants/app-routes'

export const checkIsPrivateRoute = (asPath: string) => {
  const appPrivateRoutes = Object.values(APP_ROUTES.private)

  return appPrivateRoutes.includes(asPath)
}
