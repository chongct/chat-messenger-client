import config from '@/app/config';
import { fetchHelper } from '@/app/utils';

const { API_BASE_URL } = config;

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

export const checkAuth = async () => {
  try {
    return await fetchHelper({
      credentials: 'include',
      url: `${API_BASE_URL}auth/status`,
    });
  } catch (error) {
    console.error(`Error checking auth: ${error}`);
  }
};
