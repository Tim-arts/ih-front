export const setObject = (key, value): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getObject = (key) => {
  const value = localStorage.getItem(key)
  return value && JSON.parse(value)
}
