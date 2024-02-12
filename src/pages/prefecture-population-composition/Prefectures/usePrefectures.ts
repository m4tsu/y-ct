import { useSuspenseQuery } from '@tanstack/react-query';

import { prefecturesQuery } from '@/pages/prefecture-population-composition/queries';

export const usePrefectures = () => {
  return useSuspenseQuery(prefecturesQuery);
};
