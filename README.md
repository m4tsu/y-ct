# Y社コーディング課題

## デプロイ先
vercel
https://y-ct.vercel.app/

## セットアップ
```bash
npm install
```

## コマンド
- `npm run test`
  - テスト実行
- `npm run lint`
  - 静的解析実行
  - `npm run lint:eslint` のように個別実行も可能

詳細は `package.json` 参照。

## ディレクトリ構成
### 基本方針
- 基本的にはコロケーションする
  - 特定のモジュールからのみ利用するのであれば、そのディレクトリ内に置く
- 責務の違いからそうするべき・再利用の必要がある・そうなる可能性が高い 等の理由から、`src/` 直下等に切り出す

### 今回の各ディレクトリ
- `libs/`
  - ライブラリの設定やライブラリ的に扱うようなモジュール
- `domains/`
  - アプリケーションで利用されるデータのモデル（型や所謂ドメインロジック）
- `api/`
  - API へのリクエストを行う関数等
  - `path/to/resource/`
    - `request.ts`
      - APIへのリクエスト関数
      - 利用側にリクエスト・レスポンスのスキーマの型が表出しないように隠蔽する（ `domain` の型で返す）。そのため必要があればへのデータの変形なども行う
    - `schema.ts`
      - リクエスト・レスポンス等の型
      - 今回は利用していないが、OpenAPIやGraphQL等のスキーマから自動生成したい
    - `mock.ts`
      - テスト用のレスポンスのモック等
- `pages/`
  - ルーティング（今回はないが）に対応する形でページで利用されるコンポーネント等を実装するディレクトリを切る場所
  - Next.js だったら `pages/` `apps/` 等フレームワークの機構をそのまま利用する。そうでなくても、大抵はページがコンポーネントのコロケーションのためのグルーピングの一番大きな単位になるので、このようなディレクトリを切る
- `ui-components/` (今回は無し)
  - 一般的にUIコンポーネントと呼ばれるような、特定のドメインや機能に依存しない React Component
  - e.g., `Button`, `ModalDialog`
- `features/` (今回は無し)
  - 複数のページから再利用されるコンポーネントを適当な関心の単位でグルーピングし置く場所
  - 最近 `featuresディレクトリ（Screaming Architecture）` として認知されているものと近しいが、個人的には最初は `pages/` にコロケーションし、必要になったら外に出せば十分だと感じている
  - e.g., `users/`, `posts/`

## 主な採用ライブラリ
- `TanStack Query`
  - データフェッチとそのキャッシュに関する要件は多岐にわたるため、自前で抽象化hookを実装するよりもライブラリを頼りたかった。所謂 `非同期状態管理ライブラリ` でポピュラーな `TanStack Query` と `SWR` の内、機能オプションが豊富で、キャッシュ管理に柔軟性がありそうな前者を選択した
  - 実務で深く利用した経験はありません
- `Mock Service Worker(MSW)`
  - 主にテスト時にHTTPリクエストをモックする目的で導入。この用途で、他に有力な選択肢を知りませんでした
