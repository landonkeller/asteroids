export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

export const getScale = (size: string) => {
  if (size === 'sm') return 1
  if (size === 'md') return 1.5
  return 2.5
}

export const getRandomBool = () => {
  return Math.round(Math.random()) === 1
}
