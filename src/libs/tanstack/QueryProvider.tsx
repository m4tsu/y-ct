import { QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { createClient } from './client';

import type { FC, PropsWithChildren } from 'react';

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    createClient({
      onError: (err) => {
        window.alert(err.message);
      },
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
