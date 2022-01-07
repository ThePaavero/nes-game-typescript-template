export const buttonIsPressed = (slug: string, keysDown: string[]): boolean => {
  return keysDown.includes(slug)
}
