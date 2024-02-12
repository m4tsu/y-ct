import { screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { mswServer } from '@/test-helpers/apiMock';
import { render } from '@/test-helpers/render';

import { PrefecturePopulationCompositionPage } from './page';

beforeAll(() => mswServer.listen());
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());

test('都道府県情報が取得され表示される', async () => {
  render(<PrefecturePopulationCompositionPage />);

  expect(screen.getByText('loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(
      screen.getByRole('checkbox', { name: '北海道' }),
    ).toBeInTheDocument();
  });
});

test('都道府県にチェックを入れると人口構成情報が取得され表示される', async () => {
  const { container } = render(<PrefecturePopulationCompositionPage />);

  const checkbox = await screen.findByRole('checkbox', {
    name: '北海道',
  });
  await userEvent.click(checkbox);

  // チェックを入れた都道府県の人口構成情報のグラフが表示される
  // 年度
  await waitFor(() => {
    expect(screen.getByText('2010')).toBeInTheDocument();
  });
  expect(screen.getByText('2020')).toBeInTheDocument();
  expect(screen.getByText('2030')).toBeInTheDocument();
  const legends = container.getElementsByClassName('highcharts-legend-item');
  expect(legends).toHaveLength(1);
  expect(legends[0]).toHaveTextContent('北海道');
});

test('人口推移の種類を選択するとグラフが更新される', async () => {
  render(<PrefecturePopulationCompositionPage />);

  const checkbox = await screen.findByRole('checkbox', {
    name: '北海道',
  });
  await userEvent.click(checkbox);

  // NTOE: Y軸のラベルがデータの値によって具体的にどのように変化するかを確認したいが、Highchartの詳細について調査に時間がかかりそうなのでとりあえず変化することだけチェックしている

  // 総人口 時のY軸のラベルの一部
  expect(screen.getByText('5 000k')).toBeInTheDocument();

  // 種類が選択できる
  const select = await screen.findByRole('combobox', { name: '種別' });
  await userEvent.click(select);
  expect(screen.getByRole('option', { name: '総人口' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '年少人口' })).toBeInTheDocument();
  await userEvent.selectOptions(select, '年少人口');

  // 総人口 時のY軸のラベルが変わっている
  expect(await screen.queryByText('5 000k')).not.toBeInTheDocument();
});
