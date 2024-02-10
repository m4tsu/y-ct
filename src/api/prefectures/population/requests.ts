import type { PopulationCompositions } from '@/domains/Population';
import { resasApiClient } from '@/libs/fetch/apiClient';

import type {
  GetPopulationCompositionRequest,
  GetPopulationCompositionResponse,
} from './schema';

type Params = GetPopulationCompositionRequest;
export const getpopulationComposition = async (
  params: Params,
): Promise<PopulationCompositions> => {
  const res = await resasApiClient<
    GetPopulationCompositionResponse,
    GetPopulationCompositionRequest
  >('/population/composition/perYear', { method: 'Get', body: params });
  return res.result;
};
