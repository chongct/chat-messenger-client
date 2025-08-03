import { API_BASE_URL, IS_COOKIE_DISABLED } from '@/app/config';
import { fetchHelper, REFRESH_TOKEN_LOCAL_STORAGE_KEY } from '@/app/utils';

export const registerUser = async (
  prevState: { error: Record<string, string>; success: boolean },
  formData: FormData
) => {
  try {
    return await fetchHelper({
      body: JSON.stringify({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
      }),
      credentials: 'include',
      method: 'POST',
      url: `${API_BASE_URL}auth/register`,
    });
  } catch (error) {
    console.error(`Error registering user: ${error}`);
  }
};

export const loginUser = async (
  prevState: { error: Record<string, string>; userId: string },
  formData: FormData
) => {
  try {
    return await fetchHelper({
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
      credentials: 'include',
      method: 'POST',
      url: `${API_BASE_URL}auth/login`,
    });
  } catch (error) {
    console.error(`Error logging in: ${error}`);
  }
};

export const checkAuth = async (accessToken: string) => {
  try {
    return await fetchHelper({
      ...(accessToken && { headers: { Authorization: `Bearer ${accessToken}` } }),
      url: `${API_BASE_URL}auth/status`,
    });
  } catch (error) {
    console.error(`Error checking auth: ${error}`);
  }
};

export const logoutUser = async (csrfToken: string) => {
  try {
    return await fetchHelper({
      credentials: 'include',
      method: 'POST',
      url: `${API_BASE_URL}auth/logout`,
      headers: {
        'x-csrf-token': csrfToken,
        ...(IS_COOKIE_DISABLED
          ? { 'x-refresh-token': localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY) || '' }
          : {}),
      },
    });
  } catch (error) {
    console.error(`Error logging out: ${error}`);
  }
};

export const getRefreshToken = async (csrfToken: string) => {
  try {
    return await fetchHelper({
      credentials: 'include',
      method: 'POST',
      url: `${API_BASE_URL}auth/refresh`,
      headers: {
        'x-csrf-token': csrfToken,
        ...(IS_COOKIE_DISABLED
          ? { 'x-refresh-token': localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY) || '' }
          : {}),
      },
    });
  } catch (error) {
    console.error(`Error refreshing token: ${error}`);
  }
};

export const getCsrfToken = async () => {
  try {
    return await fetchHelper({
      credentials: 'include',
      method: 'GET',
      url: `${API_BASE_URL}auth/csrf-token`,
    });
  } catch (error) {
    console.error(`Error getting csrf token: ${error}`);
  }
};
