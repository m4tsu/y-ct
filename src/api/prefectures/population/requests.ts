import type { PopulationCompositions } from '@/domains/Population';
import { resasApiClient } from '@/libs/fetch/apiClient';

import type {
  GetPopulationCompositionRequestParams,
  GetPopulationCompositionResponse,
} from './schema';

type Params = GetPopulationCompositionRequestParams;
export const getpopulationComposition = async (
  params: Params,
): Promise<PopulationCompositions> => {
  const searchParams = new URLSearchParams({
    prefCode: String(params.prefCode),
    cityCode: params.cityCode,
  });
  const res = await resasApiClient<GetPopulationCompositionResponse>(
    '/population/composition/perYear',
    { method: 'Get' },
    searchParams,
  );
  return res.result;
};
