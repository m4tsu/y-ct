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
              year: 1960,
              value: 5039206,
            },
            {
              year: 1965,
              value: 5171800,
            },
            {
              year: 1970,
              value: 5184287,
            },
            {
              year: 1975,
              value: 5338206,
            },
            {
              year: 1980,
              value: 5575989,
            },
            {
              year: 1985,
              value: 5679439,
            },
            {
              year: 1990,
              value: 5643647,
            },
            {
              year: 1995,
              value: 5692321,
            },
            {
              year: 2000,
              value: 5683062,
            },
            {
              year: 2005,
              value: 5627737,
            },
            {
              year: 2010,
              value: 5506419,
            },
            {
              year: 2015,
              value: 5381733,
            },
            {
              year: 2020,
              value: 5224614,
            },
            {
              year: 2025,
              value: 5016554,
            },
            {
              year: 2030,
              value: 4791592,
            },
            {
              year: 2035,
              value: 4546357,
            },
            {
              year: 2040,
              value: 4280427,
            },
            {
              year: 2045,
              value: 4004973,
            },
          ],
        },
        {
          label: '年少人口',
          data: [
            {
              year: 1960,
              value: 1681479,
            },
            {
              year: 1965,
              value: 1462123,
            },
            {
              year: 1970,
              value: 1309487,
            },
            {
              year: 1975,
              value: 1312611,
            },
            {
              year: 1980,
              value: 1298324,
            },
            {
              year: 1985,
              value: 1217959,
            },
            {
              year: 1990,
              value: 1034251,
            },
            {
              year: 1995,
              value: 898673,
            },
            {
              year: 2000,
              value: 792352,
            },
            {
              year: 2005,
              value: 719057,
            },
            {
              year: 2010,
              value: 657312,
            },
            {
              year: 2015,
              value: 608296,
            },
            {
              year: 2020,
              value: 555804,
            },
            {
              year: 2025,
              value: 511677,
            },
            {
              year: 2030,
              value: 465307,
            },
            {
              year: 2035,
              value: 423382,
            },
            {
              year: 2040,
              value: 391086,
            },
            {
              year: 2045,
              value: 360177,
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
