export const APP_ROUTES = {
  private: ['/control-adm', '/update-product'],

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
