declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string
    NEXTAUTH_GOOGLE_CLIENT_ID: string
    NEXTAUTH_GOOGLE_CLIENT_SECRET_ID: string
    NEXTAUTH_URL: string
    NEXTAUTH_SECRET: string
    UPLOADTHING_SECRET: string
    UPLOADTHING_APP_ID: string
    JWT_SECRET_KEY_ADM: string
    NEXT_ENV: string
    NEXT_PUBLIC_POSTHOG_KEY: string
    NEXT_PUBLIC_POSTHOG_HOST: string
    NEXT_PUBLIC_API_MOCKING: string
  }
}
