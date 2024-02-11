export type GetPopulationCompositionRequestParams = {
  prefCode: number;
  /**
   * 市区町村コード「すべての市区町村」を選択する場合は「-」を送ります。
   */
  cityCode: string;
  addArea?: string;
};

export type GetPopulationCompositionResponse = {
  message: null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: {
        year: number;
        value: number;
      }[];
    }[];
  };
};
