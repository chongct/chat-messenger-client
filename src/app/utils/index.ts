export const fetchHelper = async ({
  body,
  credentials,
  headers,
  method = 'GET',
  url,
}: {
  body?: string;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
  method?: string;
  url: string;
}) => {
  const defaultHeader = { 'Content-Type': 'application/json' };
  const modifiedHeaders = { ...defaultHeader, ...headers };

  const requestBody = {
    ...(body && { body }),
    ...(credentials && { credentials }),
    headers: modifiedHeaders,
    method,
  };

  try {
    const response = await fetch(url, requestBody);
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      return await response.json();
    }
  } catch (error) {
    console.error(`[fetchHelper] Error with ${url}: ${error}`);
  }
};

export const noop = () => {};
