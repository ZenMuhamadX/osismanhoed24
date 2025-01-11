import crypto from 'crypto'
export const genId = (): string => {
  const randomBytes = crypto.randomBytes(32)
  return `0x${crypto.createHash('SHA256').update(randomBytes).digest('hex').slice(0, 12).toUpperCase()}`
}
console.log(genId())
