import { useState, type FC, useCallback, memo, useMemo } from 'react';

import type { Prefecture } from '@/domains/Prefecture';
import { usePrefectures } from '@/pages/prefecture-population-composition/queries';

import { PopulationComposition } from './PopulationComposition';
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

  const isSelected = useCallback(
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

  const selectedPrefectures: Prefecture[] = useMemo(() => {
    return prefectures.filter((prefecture) => isSelected(prefecture.prefCode));
  }, [prefectures, isSelected]);

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
    isSelected,
    selectedPrefectures,
    toggle,
  };
};

export const Prefectures: FC = () => {
  const { data: prefectures } = usePrefectures();
  const { isSelected, toggle, selectedPrefectures } =
    usePrefectureSelection(prefectures);

  return (
    <div>
      <ul className={styles.prefectureList}>
        {prefectures.map((prefecture) => (
          <li key={prefecture.prefCode} className={styles.prefectureListItem}>
            <PrefectureCheckbox
              prefecture={prefecture}
              checked={isSelected(prefecture.prefCode)}
              onChange={toggle}
            />
          </li>
        ))}
      </ul>
      <PopulationComposition prefectures={selectedPrefectures} />
    </div>
  );
};
