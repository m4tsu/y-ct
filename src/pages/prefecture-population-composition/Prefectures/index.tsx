import { useState, type FC, useCallback, memo } from 'react';

import { usePrefectures } from '@/pages/prefecture-population-composition/queries';

import { PrefectureCheckbox as _PrefectureCheckbox } from './PrefectureCheckbox';
import styles from './index.module.scss';

type CheckedPrefectureMap = {
  [prefCode: string]: boolean;
};

const PrefectureCheckbox = memo(_PrefectureCheckbox);

export const Prefectures: FC = () => {
  const { data: prefectures } = usePrefectures();
  const [checkedPrefectures, setCheckedPrefectures] =
    useState<CheckedPrefectureMap>(() => ({}));

  const handleCheckboxChange = useCallback((prefCode: number) => {
    setCheckedPrefectures((prev) => {
      const current = prev[`${prefCode}`];
      return {
        ...prev,
        [`${prefCode}`]: current === undefined ? true : !current,
      };
    });
  }, []);

  console.log(checkedPrefectures);

  return (
    <ul className={styles.prefectureList}>
      {prefectures.map((prefecture) => (
        <li key={prefecture.prefCode} className={styles.prefectureListItem}>
          <PrefectureCheckbox
            prefecture={prefecture}
            checked={checkedPrefectures[`${prefecture.prefCode}`] ?? false}
            toggle={handleCheckboxChange}
          />
        </li>
      ))}
    </ul>
  );
};
