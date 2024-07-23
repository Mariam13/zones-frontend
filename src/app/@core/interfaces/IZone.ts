export interface IZone {
  id?: string;
  name: string;
  points: number[][];
}

export interface IZoneListFilter {
  term: string;
  newest: boolean;
}
