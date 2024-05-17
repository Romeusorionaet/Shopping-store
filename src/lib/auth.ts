export const getGoogleOAuthURL = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

  const options = {
    redirect_uri:
      'https://api-shopping-store.onrender.com/auth/register/oauth-google/callback',
    client_id:
      '581486127159-kv2ul4b30dpj1blp9na91rqf6974pba0.apps.googleusercontent.com',
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  }
  const qs = new URLSearchParams(options)
  const url = `${rootUrl}?${qs.toString()}`

  window.open(url, '_self')
}
