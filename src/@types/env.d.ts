declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET_ID: string
    HOST_URL: string
    NEXTAUTH_SECRET: string
    UPLOADTHING_SECRET: string
    UPLOADTHING_APP_ID: string
    MERCADOPAGO_PUBLIC_KEY: string
    MERCADOPAGO_ACCESS_TOKEN: string
  }
}
