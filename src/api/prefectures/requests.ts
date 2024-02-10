import type { Prefecture } from '@/domains/Prefecture';
import { resasApiClient } from '@/libs/fetch/apiClient';

import type { GetPrefecturesResponse } from './schema';

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const data = await resasApiClient<GetPrefecturesResponse>('/prefectures', {
    method: 'GET',
  });
  return data.result;
};
