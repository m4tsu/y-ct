import {
  queryOptions,
  useQueries,
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

const populationCompositionQuery = ({
  prefCode,
}: {
  prefCode: Prefecture['prefCode'];
}) =>
  queryOptions({
    queryKey: ['populationComposition', { prefCode }],
    queryFn: () => getpopulationComposition({ prefCode, cityCode: '-' }),
  });
export const usePopulationCompositions = (
  prefCodes: Prefecture['prefCode'][],
) => {
  return useQueries({
    queries: prefCodes.map((prefCode) =>
      populationCompositionQuery({ prefCode }),
    ),
  });
};
