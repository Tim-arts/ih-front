export enum StellarCountValues {
  V0 = 0,
  V1 = 138630,
  V2 = 726540,
  V3 = 2184930,
  V4 = 4935000,
}

export interface StellarShardsModel {
  staticModel: StaticModel
  dynamicModel: DynamicModel
}

export interface StaticModel {
  V4: number
  V3: number
  V2: number
  V1: number
}

export interface DynamicModel {
  'V0-HP': number
  'V0-ATK': number
  'V0-HP-ATK': number
  'V1-HP': number
  'V1-ATK': number
  'V1-HP-ATK': number
  'V2-HP': number
  'V2-ATK': number
  'V2-HP-ATK': number
  'V3-HP': number
  'V3-ATK': number
  'V3-SPD': number
}
