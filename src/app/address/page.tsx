import { Form } from './components/form'

export default async function Address() {
  return (
    <div>
      <h1>Complete seu pedido</h1>
      <div>
        <div>
          <h2>Endereço de Entrega</h2>
          <p>informe o endereço onde deseja receber seu pedido</p>
        </div>
      </div>

      <Form />
    </div>
  )
}
