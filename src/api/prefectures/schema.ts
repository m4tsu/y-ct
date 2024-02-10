// 実際は、OpenAPI とか graphql-codegen とかを使って生成したい

export type GetPrefecturesResponse = {
  message: null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
};
