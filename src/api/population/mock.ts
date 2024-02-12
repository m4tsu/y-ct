import { http, HttpResponse } from 'msw';

import type { GetPopulationCompositionResponse } from './schema';
const getpopulationCompositionSuccessResponse: GetPopulationCompositionResponse =
  {
    message: null,
    result: {
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            {
              year: 2010,
              value: 3000000,
            },
            {
              year: 2020,
              value: 4000000,
            },
            {
              year: 2030,
              value: 5000000,
            },
          ],
        },
        {
          label: '年少人口',
          data: [
            {
              year: 2010,
              value: 1000000,
            },
            {
              year: 2020,
              value: 2000000,
            },
            {
              year: 2030,
              value: 3000000,
            },
          ],
        },
      ],
    },
  };

export const handlers = [
  http.get<never, never, GetPopulationCompositionResponse>(
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
    () => {
      return HttpResponse.json<GetPopulationCompositionResponse>(
        getpopulationCompositionSuccessResponse,
      );
    },
  ),
];
