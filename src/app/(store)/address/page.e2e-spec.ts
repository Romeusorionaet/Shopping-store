import { HttpResponse } from 'msw'
import { test, expect } from '../../../../test/mocks/playwright-msw'
import { makeAddress } from '../../../../test/factories/make-address'

test.describe('Address test (E2E)', () => {
  test('should be able register the address of user', async ({
    page,
    worker,
    http,
  }) => {
    page.goto('/address')

    await worker.use(
      http.get('/user/get-address', async () => {
        return new HttpResponse(
          JSON.stringify({
            notFound: true,
            userAddress: null,
          }),
          {
            status: 404,
          },
        )
      }),
    )

    await page
      .getByRole('button', {
        name: 'Preencher formulário',
      })
      .click()

    await page.getByPlaceholder('example@gmail.com').fill('romeu soares')
    await page.getByPlaceholder('example@gmail.com').fill('romeu@gmail.com')
    await page.getByPlaceholder('Número de telefone').fill('84981127596')
    await page.getByPlaceholder('12345678').fill('12345678')
    await page.getByPlaceholder('Sua cidade').fill('canguaretama')
    await page.getByPlaceholder('UF da cidade').fill('rn')
    await page
      .getByPlaceholder('Nome do seu Bairro')
      .fill('bairro do desespero')
    await page.getByPlaceholder('Nome da sua Rua').fill('rua do passa nada')
    await page.getByPlaceholder('Número da redidência').fill('171')
    await page
      .getByPlaceholder('EX: Ao lado do shopping')
      .fill('por trás do beco do sufoco')

    await page.getByRole('button', { name: 'salvar', exact: true }).click()

    const toast = page.getByRole('alert')

    expect(toast).toBeTruthy()
  })

  test('should be able update the address of user', async ({
    page,
    worker,
    http,
  }) => {
    page.goto('/address')

    const userAddress = makeAddress()

    await worker.use(
      http.get('/user/get-address', async () => {
        return new HttpResponse(
          JSON.stringify({
            userAddress,
          }),
          {
            status: 200,
          },
        )
      }),
    )

    await page
      .getByRole('button', {
        name: 'Preencher formulário',
      })
      .click()

    await page.getByPlaceholder('nome e sobrenome').fill('romeu soares')
    await page.getByPlaceholder('example@gmail.com').fill(userAddress.email)
    await page.getByPlaceholder('Número de telefone').fill('84981127596')
    await page.getByPlaceholder('12345678').fill(userAddress.cep.toString())
    await page.getByPlaceholder('Sua cidade').fill(userAddress.city)
    await page.getByPlaceholder('UF da cidade').fill(userAddress.uf)
    await page
      .getByPlaceholder('Nome do seu Bairro')
      .fill(userAddress.neighborhood)
    await page.getByPlaceholder('Nome da sua Rua').fill(userAddress.street)
    await page
      .getByPlaceholder('Número da redidência')
      .fill(userAddress.houseNumber.toString())
    await page
      .getByPlaceholder('EX: Ao lado do shopping')
      .fill(userAddress.complement)

    await page
      .getByRole('button', { name: 'salvar alterações', exact: true })
      .click()

    const toast = page.getByRole('alert')
    const successMessage = page.getByText('success')

    expect(toast).toBeTruthy()
    expect(successMessage).toBeVisible()

    await page.waitForTimeout(10000)
  })
})
