import { QueryErrorBoundary } from '@/libs/tanstack/QueryErrorBoundary';
import { QueryProvider } from '@/libs/tanstack/QueryProvider';

import type { FC, PropsWithChildren } from 'react';

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <QueryErrorBoundary>{children}</QueryErrorBoundary>
    </QueryProvider>
  );
};
