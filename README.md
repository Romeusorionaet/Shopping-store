# Projeto em fase de desenvolvimento (mas já pode dar uma espiadinha)

> Esta aplicação está utilizando a API que também está em fase de desenvolvimento: https://github.com/Romeusorionaet/Api-shopping-store

<h1 align='center'> Shopping Store </h1>

<p align='center'>Atenção: A Api na qual este e-commerce consome, está hospedado de forma gratuita, e esses serviços são apenas para testes. Isso implica diretamnete no funcionamento do site como por exemplo, lentidão ao carregar os produtos no primeiro acesso.</p>

<br>

<div style='display: flex; flex-direction: column'>

## Propósito 

> Este E-commerce foi criado para fins de portfólio, demonstrando meus conhecimentos em diversas tecnologias. A Shopping Store será continuamente atualizada, embora sem uma data específica para as atualizações. Sempre que adquirir novos conhecimentos e técnicas para melhorar o sistema, irei aplicá-los aqui.

## Ferramentas Utilizadas

<a href="https://github.com/Romeusorionaet/Shopping-store/blob/main/package.json">Package.json</a>

> É importante mencionar que algumas funcionalidades introduzidas no e-commerce ainda não foram exploradas em sua totalidade. Por exemplo, o sistema de notificação atualmente só envia alertas quando um comprador tenta realizar uma compra, mas não a finaliza, lembrando-o de concluir a transação. Ainda pretendo explorar mais, tanto este sistema de notificações quanto outras funcionalidades, expandindo-as para outras áreas do e-commerce.
 
<h2 align='center'> Meus contatos </h2>

* [LinkedIn](https://www.linkedin.com/in/romeu-soares-87749a231/)

* romeuindexjs@gmail.com

* WhatsApp: 84 981127596

<br>

## Aprensentação das interfaces / Funcionalidades

- Home 
> Na primeira visualização, os produtos em promoção são apresentados em um slider automático. Logo abaixo, há a possibilidade de ver o catálogo completo ou entrar em contato com o vendedor.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-1.png)

</div>

- Home (Parte 2)
> Na segunda seção da Home, há uma barra de pesquisa que direciona o usuário a outra página com os resultados da pesquisa. Em seguida, há um carrossel de produtos com controles de setas (direita e esquerda) bastante intuitivos.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-2.png)

</div>

- Menu
> O Menu permite a navegação completa por todo o e-commerce.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-3.png)

</div>

- Autenticação
> Uma interface intuitiva permite ao usuário realizar sua autenticação, com a opção de entrar pelo Google ou inserir manualmente o e-mail e a senha. Caso não tenha uma conta registrada, há a opção de criar uma.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-4.png)

</div>

- Registrar conta
> Nesta interface, o usuário insere seus dados para registro. Diferentemente do registro pelo Google, onde a conta é autenticada automaticamente, ao criar uma conta manualmente, será necessário validá-la após a criação.

> A validação da conta é simples e intuitiva: um e-mail é enviado para sua caixa de entrada, por isso é importante fornecer um e-mail válido ao criar a conta, pois o processo de validação é essencial para realizar a autenticação na plataforma.

> No e-mail enviado, haverá um link contendo um token. Basta clicar no link, que levará de volta à plataforma, onde você só precisará clicar em "confirmar."

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-5.png)

</div>

</div>

- Corfirmação do E-mail
> Ao acessar o link recebido na sua caixa de entrada, você será direcionado para uma página onde poderá confirmar seu e-mail clicando no botão "Confirmar".

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-17.png)

</div>

</div>

- Adicionar um item ao carrinho
> Agora você pode adicionar itens ao seu carrinho de compras. Ao adicionar um item, uma mensagem temporária aparecerá na tela, informando que o item foi adicionado com sucesso.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-6.png)

</div>

- Carrinho de compra
> No carrinho de compras, você poderá visualizar os produtos adicionados, com a opção de aumentar ou diminuir a quantidade de um item específico, ou removê-lo do carrinho. Cada item é apresentado de forma resumida, exibindo apenas o título, valor, quantidade e imagem do produto.

> O carrinho também exibe informações adicionais, como o subtotal (valor total do carrinho sem desconto), descontos aplicados, e o total (valor total do carrinho com desconto). Por fim, há a opção de prosseguir para o próximo passo, que é o registro do endereço de entrega.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-7.png)

</div>

</div>

- Endereço de entrega
> Nesta interface, você encontrará um formulário essencial para registrar o endereço do cliente, com a possibilidade de atualizar qualquer informação necessária. Após registrar o endereço, basta finalizar a compra.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-8.png)

</div>

- Finalizar compra
> Finalizar uma compra é simples e seguro. Como mostrado na figura a seguir, estamos utilizando a ferramenta Stripe, atualmente em modo de teste.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-9.png)

</div>

- Notificações
> O e-commerce também conta com um sistema de notificações. A figura abaixo ilustra um exemplo de como uma notificação é recebida. O menu de notificações permite visualizar também notificações antigas.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-10.png)

</div>

- Visualização de uma notificação
> Ao clicar em uma notificação no menu, você será direcionado para uma interface semelhante à ilustrada na figura abaixo.  

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-11.png)

</div>

- Seus pedidos
> Após finalizar uma compra com sucesso, você pode abrir o menu de navegação e selecionar a opção "Seus Pedidos" para acessar a página onde poderá visualizar todos os seus pedidos.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-18.png)

</div>

- Seus pedidos (Parte 2)
> A seção "Seus Pedidos" exibirá detalhes sobre sua compra, como a data da compra, status, situação do processo, endereço de entrega, código de rastreamento (se o pedido já tiver sido entregue à agência de entrega) e os valores da compra.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-19.png)

</div>

- Página de pesquisa
> Ao pesquisar por um produto na barra de pesquisa localizada na página inicial do e-commerce, você será redirecionado para uma nova interface que exibirá os resultados da pesquisa.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-12.png)

</div>

- Páginação
> Ao visualizar os resultados da sua pesquisa, a interface inclui um modelo de paginação simples. Ela mostra setas para navegar entre as páginas e visualizar novos produtos, além de exibir o número da página atual.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-13.png)

</div>

- Detalhes do produto
> Ao clicar em um produto, você será direcionado para uma nova interface onde poderá visualizar mais informações sobre o item escolhido.

> A página de detalhes do produto inclui opções para ver novas imagens, ler sobre a política de devolução, formas de pagamento e segurança.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-14.png)

</div>

- Detalhes do produto (Parte 2)

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-15.png)

</div>

</div>

- Catálogo de produtos
> Esta é a forma como você visualizará o catálogo completo de todos os produtos.

<div align='center'>

![preview](/public/previews/preview-shopping-store-desktop-16.png)

</div>

</div>

<br>

## Em produção / sem data prevista para publicação

- Controle Administrativo do e-commerce
- Acesso completo ao perfil do usuário

<h3> Licença </h3>

<p>
<img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>
