import { Suspense, type FC } from 'react';

import { Prefectures } from './Prefectures';
import styles from './page.module.scss';

export const PrefecturePopulationCompositionPage: FC = () => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>都道府県別人口構成</h1>
      <Suspense fallback={<div>loading...</div>}>
        <Prefectures />
      </Suspense>
    </div>
  );
};
