import { API_BASE_URL } from '@/app/config';
import { fetchHelper } from '@/app/utils';

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

export const logoutUser = async () => {
  try {
    return await fetchHelper({
      credentials: 'include',
      method: 'POST',
      url: `${API_BASE_URL}auth/logout`,
    });
  } catch (error) {
    console.error(`Error logging out: ${error}`);
  }
};

export const refreshToken = async () => {
  try {
    return await fetchHelper({
      credentials: 'include',
      method: 'POST',
      url: `${API_BASE_URL}auth/refresh`,
    });
  } catch (error) {
    console.error(`Error refreshing token: ${error}`);
  }
};
