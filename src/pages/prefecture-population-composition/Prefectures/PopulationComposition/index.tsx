import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useRef, type FC, useState, useId } from 'react';

import type { Prefecture } from '@/domains/Prefecture';

import styles from './index.module.scss';
import { usePrefectureWithPopulationCompositions } from './usePrefectureWithPopulationCompositions';

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
  const selectId = useId();

  return (
    <div className={styles.layout}>
      {compositionLabels.length > 0 ? (
        <div className={styles.selectContainer}>
          <label htmlFor={selectId}>種別</label>
          <select
            id={selectId}
            onChange={(e) => {
              setSelectedCompositionLabel(e.target.value);
            }}
            value={selectedCompositionLabel}
          >
            {compositionLabels.map((label) => {
              return (
                <option key={label} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      ) : null}
      <div className={styles.chartContainer} data-testid="chart-container">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartComponentRef}
        />
      </div>
    </div>
  );
};
