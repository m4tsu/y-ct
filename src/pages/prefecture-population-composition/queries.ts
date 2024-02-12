import { queryOptions } from '@tanstack/react-query';

import { getpopulationComposition } from '@/api/population/requests';
import { getPrefectures } from '@/api/prefectures/requests';
import type { Prefecture } from '@/domains/Prefecture';

export const prefecturesQuery = queryOptions({
  queryKey: ['prefectures'],
  queryFn: getPrefectures,
});

export const populationCompositionQuery = ({
  prefCode,
  prefName,
}: Prefecture) =>
  queryOptions({
    queryKey: ['populationComposition', { prefCode }],
    queryFn: () => getpopulationComposition({ prefCode, cityCode: '-' }),
    select: (data) => ({
      prefCode,
      prefName,
      populationCompositions: data.data,
    }),
  });
