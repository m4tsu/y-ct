import { render as rtlRender } from '@testing-library/react';

import { AppProvider } from '@/pages/AppProvider';

import type { RenderOptions } from '@testing-library/react';
import type { FC, PropsWithChildren, ReactElement } from 'react';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return <AppProvider>{children}</AppProvider>;
};

export const render = (ui: ReactElement, options?: RenderOptions) => {
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};
