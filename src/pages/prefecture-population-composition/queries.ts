import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { getpopulationComposition } from '@/api/prefectures/population/requests';
import { getPrefectures } from '@/api/prefectures/requests';
import type { Prefecture } from '@/domains/Prefecture';

const prefecturesQuery = queryOptions({
  queryKey: ['prefectures'],
  queryFn: getPrefectures,
});

export const usePrefectures = () => {
  return useSuspenseQuery(prefecturesQuery);
};

type PopulationCompositionVariables = {
  prefCode: Prefecture['prefCode'];
};
const populationCompositionQuery = ({
  prefCode,
}: PopulationCompositionVariables) =>
  queryOptions({
    queryKey: ['populationComposition', { prefCode }],
    queryFn: () => getpopulationComposition({ prefCode, cityCode: '-' }),
  });

export const usePopulationComposition = (prefCode: Prefecture['prefCode']) => {
  return useQuery(populationCompositionQuery({ prefCode }));
};
