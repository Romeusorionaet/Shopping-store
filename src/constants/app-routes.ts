export const APP_ROUTES = {
  private: ['dashboard-admin'],

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
