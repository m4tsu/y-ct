import { http, HttpResponse } from 'msw';

import type { GetPrefecturesResponse } from './schema';

const getPrefecturesSuccessResponse: GetPrefecturesResponse = {
  message: null,
  result: [
    {
      prefCode: 1,
      prefName: '北海道',
    },
    {
      prefCode: 2,
      prefName: '青森県',
    },
  ],
};

export const handlers = [
  http.get<never, never, GetPrefecturesResponse>(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    () => {
      return HttpResponse.json<GetPrefecturesResponse>(
        getPrefecturesSuccessResponse,
      );
    },
  ),
];
