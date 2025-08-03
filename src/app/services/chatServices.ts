import { HF_URL } from '@/app/config';
import { fetchHelper } from '@/app/utils';

export const postChat = async (prompt: string) => {
  const chatOutput = await fetchHelper({
    body: JSON.stringify({ prompt }),
    method: 'POST',
    url: `${HF_URL}generate`,
  });
  const { result } = chatOutput ?? {};

  return result;
};
