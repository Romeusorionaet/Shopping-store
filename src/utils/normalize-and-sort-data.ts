/**
 * Normaliza e ordena os dados de um objeto.
 *
 * Esta função converte todos os valores do objeto para strings e ordena as chaves do objeto em ordem alfabética.
 *
 * @param {Record<string, any>} data - O objeto de dados a ser normalizado e ordenado. A tipagem é `any` porque os valores dos dados
 * podem ser de qualquer tipo e são convertidos para string durante o processo.
 *
 * @returns {Record<string, string>} - Um novo objeto com as chaves ordenadas e os valores convertidos para strings.
 */

export function normalizeAndSortData(data: any): any {
  if (Array.isArray(data)) {
    const normalizedArray = data.map((item) => normalizeAndSortData(item))

    return normalizedArray.sort((a, b) => {
      const aStr = JSON.stringify(a)
      const bStr = JSON.stringify(b)
      return aStr.localeCompare(bStr)
    })
  } else if (typeof data === 'object' && data !== null) {
    const sortedObject: Record<string, any> = {}
    Object.keys(data)
      .sort()
      .forEach((key) => {
        sortedObject[key] = normalizeAndSortData(data[key])
      })
    return sortedObject
  } else {
    return String(data)
  }
}
