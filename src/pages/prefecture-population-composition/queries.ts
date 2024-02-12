import {
  queryOptions,
  useQueries,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';

import { getpopulationComposition } from '@/api/population/requests';
import { getPrefectures } from '@/api/prefectures/requests';
import type { PopulationComposition } from '@/domains/Population';
import type { Prefecture } from '@/domains/Prefecture';

const prefecturesQuery = queryOptions({
  queryKey: ['prefectures'],
  queryFn: getPrefectures,
});

export const usePrefectures = () => {
  return useSuspenseQuery(prefecturesQuery);
};

const populationCompositionQuery = ({ prefCode, prefName }: Prefecture) =>
  queryOptions({
    queryKey: ['populationComposition', { prefCode }],
    queryFn: () => getpopulationComposition({ prefCode, cityCode: '-' }),
    select: (data) => ({
      prefCode,
      prefName,
      populationCompositions: data.data,
    }),
  });

type PrefectureWithPopulationCompositions = Prefecture & {
  compositionLabel: string;
  populationCompositions: PopulationComposition[];
};
type Filter = {
  compositionLabel?: string;
};
export const usePrefectureWithPopulationCompositions = (
  prefectures: Prefecture[],
  filter: Filter,
) => {
  const results = useQueries({
    queries: prefectures.map((prefecture) =>
      populationCompositionQuery(prefecture),
    ),
  });

  const compositionLabels = useMemo(() => {
    return (
      results[0]?.data?.populationCompositions.map(
        (composition) => composition.label,
      ) ?? []
    );
  }, [results]);

  const prefectureWithPopulationCompositions: PrefectureWithPopulationCompositions[] =
    useMemo(() => {
      return results.flatMap((result) => {
        if (result.data !== undefined) {
          const filterLabel = filter.compositionLabel ?? compositionLabels[0];
          if (filterLabel === undefined) {
            // data がある場合 compositionLabels は空にならない想定
            throw new Error('compositionLabels is empty');
          }
          const compositions = result.data.populationCompositions.find(
            (populationComposition) =>
              populationComposition.label === filterLabel,
          );
          if (compositions === undefined) {
            return [];
          }
          return {
            prefCode: result.data.prefCode,
            prefName: result.data.prefName,
            compositionLabel: filterLabel,
            populationCompositions: compositions.data,
          };
        } else {
          return [];
        }
      });
    }, [results, filter, compositionLabels]);

  return { prefectureWithPopulationCompositions, compositionLabels };
};
