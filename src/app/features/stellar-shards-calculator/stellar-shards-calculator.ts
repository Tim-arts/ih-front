export enum VxValues {
  V0 = 0,
  V1 = 138630,
  V2 = 726540,
  V3 = 2184930,
  V4 = 4935000,
}

export interface StellarShardsModel {
  staticModel: StaticModel
  dynamicModel: number[]
}

export interface StaticModel {
  V4: number
  V3: number
  V2: number
  V1: number
}
