import { http, HttpResponse } from 'msw';

import { baseUrl } from '@/libs/fetch/apiClient';

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
    `${baseUrl}/api/v1/prefectures`,
    () => {
      return HttpResponse.json<GetPrefecturesResponse>(
        getPrefecturesSuccessResponse,
      );
    },
  ),
];
