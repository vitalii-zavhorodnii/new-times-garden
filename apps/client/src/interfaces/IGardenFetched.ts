export interface IGardenFetchedCell {
  title: string;
  texture: string;
  growTime: number;
  plantedAt: number;
}

export type IGardenFetched = Array<IGardenFetchedCell | null>[];
