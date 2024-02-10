import { QueryCache, QueryClient } from '@tanstack/react-query';

type Option = Pick<Required<QueryCache['config']>, 'onError'>;

export const createClient = ({ onError }: Option) => {
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError,
    }),
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
    },
  });
  return client;
};
