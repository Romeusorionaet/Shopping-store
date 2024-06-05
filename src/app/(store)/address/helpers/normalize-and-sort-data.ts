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

export function normalizeAndSortData(
  data: Record<string, any>,
): Record<string, string> {
  return Object.keys(data)
    .sort()
    .reduce(
      (acc, key) => {
        acc[key] = String(data[key])
        return acc
      },
      {} as Record<string, string>,
    )
}
