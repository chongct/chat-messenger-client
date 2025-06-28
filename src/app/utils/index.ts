const statusCodeSkipParse = [401];

export const fetchHelper = async ({
  body,
  credentials,
  method = 'GET',
  url,
}: {
  body?: string;
  credentials?: RequestCredentials;
  method?: string;
  url: string;
}) => {
  const requestBody = {
    ...(body && { body }),
    ...(credentials && { credentials }),
    headers: { 'Content-Type': 'application/json' },
    method,
  };

  try {
    const response = await fetch(url, requestBody);
    const { status } = response ?? {};

    if (!statusCodeSkipParse.includes(status)) {
      return await response.json();
    }
  } catch (error) {
    console.error(`[fetchHelper] Error with ${url}: ${error}`);
  }
};

export const noop = () => {};
