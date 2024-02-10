import type { Prefecture } from '@/domains/Prefecture';

import styles from './index.module.scss';

import type { FC } from 'react';

type Props = {
  prefecture: Prefecture;
  checked: boolean;
  toggle: (prefCode: Prefecture['prefCode']) => void;
};
export const PrefectureCheckbox: FC<Props> = ({
  prefecture,
  checked,
  toggle,
}) => {
  const id = `${prefecture.prefCode}`;

  return (
    <div className={styles.prefectureCheckboxContainer}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => toggle(prefecture.prefCode)}
      />
      <label htmlFor={id}>{prefecture.prefName}</label>
    </div>
  );
};
