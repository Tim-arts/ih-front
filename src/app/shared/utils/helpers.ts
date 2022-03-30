import { getObject } from './local-storage'

export const concatArrayToNumber = (array: number[]): number => {
  return array.reduce((partialSum, a) => partialSum + a, 0)
}

export const hasDataSavedInLocalStorage = (): boolean => {
  const key: string = 'idle-heroes-ss-calculator'
  return !!getObject(key)
}

export const areArraysEqual = (array1: number[], array2: number[]): boolean => {
  return JSON.stringify(array1) === JSON.stringify(array2)
}
