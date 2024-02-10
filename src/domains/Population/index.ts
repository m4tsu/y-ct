export type PopulationComposition = {
  year: number;
  value: number;
};

export type PopulationCompositions = {
  boundaryYear: number;
  data: {
    label: string;
    data: PopulationComposition[];
  }[];
};
