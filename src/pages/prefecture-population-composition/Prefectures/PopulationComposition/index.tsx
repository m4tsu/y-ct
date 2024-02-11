import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef, type FC, useState } from 'react';

import type { Prefecture } from '@/domains/Prefecture';
import { usePrefectureWithPopulationCompositions } from '@/pages/prefecture-population-composition/queries';

import styles from './index.module.scss';

type Props = {
  prefectures: Prefecture[];
};
export const PopulationComposition: FC<Props> = ({ prefectures }) => {
  const [selectedCompositionLabel, setSelectedCompositionLabel] =
    useState<string>();
  const { prefectureWithPopulationCompositions, compositionLabels } =
    usePrefectureWithPopulationCompositions(prefectures, {
      compositionLabel: selectedCompositionLabel,
    });

  // 年のリストは全てのデータが同一であると想定して1つ目のデータから取得
  const years: string[] | undefined =
    prefectureWithPopulationCompositions[0]?.populationCompositions.map(
      (composition) => composition.year.toString(),
    );
  const options: Highcharts.Options | null = (() => {
    return {
      title: {
        text: '人口推移',
      },
      xAxis: {
        title: {
          text: '年度',
        },
        categories: years,
      },
      yAxis: {
        title: {
          text: '人口数',
        },
      },
      series: prefectureWithPopulationCompositions.map((composition) => {
        const values = composition.populationCompositions.map((composition) => {
          return composition.value;
        });
        return {
          type: 'line',
          name: composition.prefName,
          data: values,
        };
      }),
    };
  })();

  const chartComponentRef = useRef<HighchartsReact.RefObject | null>(null);

  return (
    <div className={styles.layout}>
      {compositionLabels.length > 0 ? (
        <select
          onChange={(e) => {
            setSelectedCompositionLabel(e.target.value);
          }}
        >
          {compositionLabels.map((label) => {
            return (
              <option key={label} value={label}>
                {label}
              </option>
            );
          })}
        </select>
      ) : null}

      <div className={styles.chartContainer}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      </div>
    </div>
  );
};
