export function generateCode() {
  const cod = Math.floor(1000000000 + Math.random() * 9000000000).toString()
  return `${cod.substring(0, 10)}`
}
