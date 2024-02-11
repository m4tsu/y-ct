import { useState, type FC, useCallback, memo, useMemo } from 'react';

import type { Prefecture } from '@/domains/Prefecture';
import { usePrefectures } from '@/pages/prefecture-population-composition/queries';

import { PrefectureCheckbox as _PrefectureCheckbox } from './PrefectureCheckbox';
import styles from './index.module.scss';

type PrefectureSelection = {
  [prefCode: string]: boolean;
};

const PrefectureCheckbox = memo(_PrefectureCheckbox);

const usePrefectureSelection = (prefectures: Prefecture[]) => {
  const [prefectureSelection, setPrefectureSelection] =
    useState<PrefectureSelection>(() => {
      return Object.fromEntries(
        prefectures.map((prefecture) => [`${prefecture.prefCode}`, false]),
      );
    });

  const isChecked = useCallback(
    (prefCode: Prefecture['prefCode']) => {
      const checked = prefectureSelection[`${prefCode}`];
      if (checked === undefined) {
        throw new Error('invalid prefCode');
      } else {
        return checked;
      }
    },
    [prefectureSelection],
  );

  const selecteddPrefectureCodes: Prefecture['prefCode'][] = useMemo(() => {
    return Object.entries(prefectureSelection).reduce<Prefecture['prefCode'][]>(
      (prev, current) => {
        const [prefCode, selected] = current;
        if (selected) {
          prev.push(Number(prefCode));
        }
        return prev;
      },
      [],
    );
  }, [prefectureSelection]);

  const toggle = useCallback((prefCode: number) => {
    setPrefectureSelection((prev) => {
      const current = prev[`${prefCode}`];
      return {
        ...prev,
        [`${prefCode}`]: current === undefined ? true : !current,
      };
    });
  }, []);

  return {
    prefectureSelection,
    isChecked,
    selecteddPrefectureCodes,
    toggle,
  };
};

export const Prefectures: FC = () => {
  const { data: prefectures } = usePrefectures();
  const { isChecked, toggle } = usePrefectureSelection(prefectures);

  return (
    <ul className={styles.prefectureList}>
      {prefectures.map((prefecture) => (
        <li key={prefecture.prefCode} className={styles.prefectureListItem}>
          <PrefectureCheckbox
            prefecture={prefecture}
            checked={isChecked(prefecture.prefCode)}
            onChange={toggle}
          />
        </li>
      ))}
    </ul>
  );
};
