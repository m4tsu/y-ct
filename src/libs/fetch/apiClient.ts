import { NetworkError, ServerError } from './errors';

const _baseUrl = import.meta.env.VITE_RESAS_API_BASE_URL;
const basePath = '/api/v1';
const apiKey = import.meta.env.VITE_RESAS_API_KEY;

if (typeof _baseUrl !== 'string') {
  throw new Error('env.VITE_RESAS_API_BASE_URL is not defined');
}
if (typeof apiKey !== 'string') {
  throw new Error('env.VITE_RESAS_API_KEY is not defined');
}

export const baseUrl = _baseUrl;

type FetchOptions<ReqBody = undefined> = ReqBody extends undefined
  ? Omit<RequestInit, 'body'> & { body?: undefined }
  : {
      body: ReqBody;
    } & Omit<RequestInit, 'body'>;

export const resasApiClient = async <ResBody = unknown, ReqBody = undefined>(
  path: string,
  options: FetchOptions<ReqBody>,
  params?: URLSearchParams,
): Promise<ResBody> => {
  const url = new URL(`${basePath}${path}`, baseUrl);
  if (params !== undefined) {
    url.search = params.toString();
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: options?.body !== undefined ? JSON.stringify(options.body) : null,
    });
    if (!response.ok) {
      throw new ServerError(
        `Request failed with status code ${response.status}`,
        { status: response.status },
      );
    }
    return (await response.json()) as ResBody;
  } catch (e) {
    if (e instanceof ServerError) {
      throw e;
    }
    throw new NetworkError('Network error occurred', { cause: e });
  }
};
