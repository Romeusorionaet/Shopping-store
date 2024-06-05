export function DataCreditCardTest() {
  return (
    <div className="mb-10">
      <p>
        Como estamos em fase de testes, convidamos você a simular uma compra
        utilizando os dados de cartão de crédito de teste fornecidos abaixo.
      </p>

      <div>
        <h2 className="font-bold">
          Utilize esses dados para realizar a compra:
        </h2>

        <p>
          Número do cartão: <span>4242 4242 4242 4242</span>
        </p>

        <p>
          MM / AA: <span>12/31</span>
        </p>

        <p>
          CVC: <span>123</span>
        </p>
      </div>
    </div>
  )
}
