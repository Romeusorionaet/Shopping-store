export const APP_ROUTES = {
  private: [
    '/dashboard-admin',
    '/product-manage/register-product',
    '/product-manage/update-product',
  ],

  public: {
    dashboard: [
      '/',
      '/catalog',
      '/address',
      '/details',
      '/orders',
      '/success',
      'notification',
    ],
    auth: ['/signIn', '/signUp', 'confirm-email'],
  },
}
