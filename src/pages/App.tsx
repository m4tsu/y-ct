import { AppProvider } from './AppProvider';
import { AppLayout } from './layout';
import { PrefecturePopulationCompositionPage } from './prefecture-population-composition/page';

import type { FC } from 'react';

export const App: FC = () => {
  return (
    <AppProvider>
      <AppLayout>
        {/* 本来はルーティングするが今回は必要ないので直接呼び出す */}
        <PrefecturePopulationCompositionPage />
      </AppLayout>
    </AppProvider>
  );
};
