import { getObject } from './local-storage'

export const concatArrayToNumber = (array: number[]): number => {
  return array.reduce((partialSum, a) => partialSum + a, 0)
}

export const hasDataSavedInLocalStorage = (): boolean => {
  const key: string = 'idle-heroes-ss-calculator'
  return !!getObject(key)
}
