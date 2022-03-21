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
  V4: number | null
  V3: number | null
  V2: number | null
  V1: number | null
}

export interface DynamicModel {
  nodes: {
    'V0-HP': number | null
    'V0-ATK': number | null
    'V0-HP-ATK': number | null
    'V1-HP': number | null
    'V1-ATK': number | null
    'V1-HP-ATK': number | null
    'V2-HP': number | null
    'V2-ATK': number | null
    'V2-HP-ATK': number | null
    'V3-HP': number | null
    'V3-ATK': number | null
    'V3-SPD': number | null
  }
  name: string
}

export const staticDefaultValues: StaticModel = {
  V4: null,
  V3: null,
  V2: null,
  V1: null,
}

export const dynamicDefaultValues: DynamicModel[] = [
  {
    nodes: {
      'V0-HP': null,
      'V0-ATK': null,
      'V0-HP-ATK': null,
      'V1-HP': null,
      'V1-ATK': null,
      'V1-HP-ATK': null,
      'V2-HP': null,
      'V2-ATK': null,
      'V2-HP-ATK': null,
      'V3-HP': null,
      'V3-ATK': null,
      'V3-SPD': null,
    },
    name: '',
  },
]
