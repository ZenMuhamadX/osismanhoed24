export const genId = (): string => {
  const randomBytes = new Uint8Array(16)
  window.crypto.getRandomValues(randomBytes)
  const ID = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `0x${ID.slice(0, 8).toUpperCase()}`
}
