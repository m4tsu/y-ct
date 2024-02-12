import { setupServer } from 'msw/node';

import { handlers as populationHandlers } from '@/api/population/mock';
import { handlers as prefectureHandlers } from '@/api/prefectures/mock';

import type { HttpHandler } from 'msw';

export const handlers: HttpHandler[] = [
  ...prefectureHandlers,
  ...populationHandlers,
];
export const mswServer = setupServer(...handlers);
