import config from '@/app/config';

export const registerUser = async (prevState: string, formData: FormData) => {
  const { API_BASE_URL } = config;
  const requestBody = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }),
  };

  try {
    const response = await fetch(`${API_BASE_URL}register`, requestBody);
    const registrationStatus = await response.json();

    return registrationStatus;
  } catch (error) {
    console.log(`Error registering user: ${error}`);
  }
};
