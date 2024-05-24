/**
 * Verifica se os dados do formulário de endereço foram alterados em relação aos dados salvos.
 *
 * @param {any} addressFormData - Os dados do formulário de endereço. A tipagem é `any` porque os dados são
 * convertidos para string durante a normalização e ordenação, tornando a tipagem original irrelevante.
 * @param {any} oldAddress - Os dados de endereço salvos. A tipagem é `any` pelo mesmo motivo acima.
 *
 * @returns {boolean} - Retorna um objeto com a propriedade `isSameData` que indica se os dados são os mesmos.
 */

import { normalizeAndSortData } from './normalize-and-sort-data'

export function hasDataChangedDataAddress(
  addressFormData: any,
  oldAddress: any,
) {
  const sortedFormData = normalizeAndSortData(addressFormData)
  const sortedSavedData = oldAddress ? normalizeAndSortData(oldAddress) : null

  const isSameData =
    sortedSavedData &&
    JSON.stringify(sortedFormData) === JSON.stringify(sortedSavedData)

  return { isSameData }
}
