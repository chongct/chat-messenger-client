export const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001/'
    : 'https://chat-messenger-server.vercel.app/';

export const RESTRICTED_ROUTES = ['/'];
export const AUTHENTICATED_REDIRECT_ROUTES = ['/login', '/register'];
export const IS_COOKIE_DISABLED = true;
