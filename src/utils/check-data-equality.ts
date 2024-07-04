/**
 * Verifica se os dados do formulário de endereço foram alterados em relação aos dados salvos.
 *
 * @param {any} firstAnyData - A tipagem é `any` porque os dados são convertidos para string durante a normalização e
 * ordenação, tornando a tipagem original irrelevante.
 * @param {any} secondAnyData - A tipagem é `any` pelo mesmo motivo acima.
 *
 * @returns {boolean} - Retorna um objeto com a propriedade `isSameData` que indica se os dados são os mesmos.
 */

import { normalizeAndSortData } from './normalize-and-sort-data'

export function checkDataEquality(firstAnyData: any, secondAnyData: any) {
  const sortedFormData = normalizeAndSortData(firstAnyData)
  const sortedSavedData = secondAnyData
    ? normalizeAndSortData(secondAnyData)
    : null

  const isSameData =
    sortedSavedData &&
    JSON.stringify(sortedFormData) === JSON.stringify(sortedSavedData)

  return { isSameData }
}
