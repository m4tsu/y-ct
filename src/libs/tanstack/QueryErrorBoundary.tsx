import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import type { FC, PropsWithChildren } from 'react';

export const QueryErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <div>
              <p>Something went wrong:</p>
              <pre>{error.message}</pre>
              <button onClick={() => resetErrorBoundary()}>Try again</button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
