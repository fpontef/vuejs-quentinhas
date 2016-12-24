# VueJS FrontEnd for API REST

> A Vue.js project using Browserify

The goal for this project is to implement a REST API backend I built for a class work.
It wasn't mandatory, but wanted to build something different and had the change to try 
those tech I'm already studying, like Javascript and VueJS Library.

"Marmita" or "Quentinha" is a surname for lunch box or packaed lunch. Instead of eating at home, fastfood or a restaurant, some people buy a "quentinha" to eat at work.
With this project I could show a basic CRUD (only missing some "UD" - Update and Delete).

Backend using a [REST API with Laravel PHP Framework](https://github.com/sobralense/restphp-quentinhas).

## Used
- Bootstrap
- Browserify
- VueJS Library
- Vue-router
- Vue-resource

## What is intended to
- Show my Javascript + VueJS project.
- Proof of concept what I could make for an API consumer.

## What is not intended to
- To sell as it is.
- Deal with monetary issues.

### Todo:
- Refactor the code so can be more modular and taked advantage from VueJS as Component.
- Bugs with Order -> Products.
- Missing DELETE and UPDATE. (Only Order's Deliveryman and Status have the update feature)

###Project Screenshots
#### Mobile Version
![Mobile Home](https://cloud.githubusercontent.com/assets/5157861/21467201/254edaa4-c9c4-11e6-8934-fb614694bb5d.png?raw=true "Mobile Home")
![Clients](https://cloud.githubusercontent.com/assets/5157861/21467198/253b2496-c9c4-11e6-8554-0032c621d362.png?raw=true "Clients List")
![Orders](https://cloud.githubusercontent.com/assets/5157861/21467199/253bdcc4-c9c4-11e6-9cc5-da0230b98633.png?raw=true "Orders List")
![Orders Horizontal](https://cloud.githubusercontent.com/assets/5157861/21467195/253a4382-c9c4-11e6-9c71-d669a9c7c054.png?raw=true "Orders List Horizontal")
![Mobile Menu](https://cloud.githubusercontent.com/assets/5157861/21467196/253a7cb2-c9c4-11e6-96bc-c4fa8aebc195.png?raw=true "Mobile Menu")

#### Normal Version
![Normal Home](https://cloud.githubusercontent.com/assets/5157861/21467203/2d7ba266-c9c4-11e6-8b20-a66dcb02056f.png?raw=true "Normal Home")
![Client List](https://cloud.githubusercontent.com/assets/5157861/21467208/2d9b9b3e-c9c4-11e6-8244-1fb59a5a4e3e.png?raw=true "Client List")
![Client Search](https://cloud.githubusercontent.com/assets/5157861/21467205/2d9947da-c9c4-11e6-8116-2065d52ed04d.png?raw=true "Client Search")
![Order List](https://cloud.githubusercontent.com/assets/5157861/21467207/2d9b708c-c9c4-11e6-8841-061b0f971d7b.png?raw=true "Order List")
![New Order](https://cloud.githubusercontent.com/assets/5157861/21467204/2d91fc3c-c9c4-11e6-9ebf-25292ac13aa9.png?raw=true "New Order")
![Delivery List]https://cloud.githubusercontent.com/assets/5157861/21467212/2db106ea-c9c4-11e6-9788-0af7cf3e4226.png?raw=true "Delivery List")
![Company List and New](https://cloud.githubusercontent.com/assets/5157861/21467210/2da49d2e-c9c4-11e6-8a85-209b76e6d588.png?raw=true "Company List and New")
![Client List](https://cloud.githubusercontent.com/assets/5157861/21467208/2d9b9b3e-c9c4-11e6-8244-1fb59a5a4e3e.png?raw=true "Client List")

## The backend send a JSON like this:
####Client JSON:  /api/cliente
```
[
{
"id": 1,
"nome": "Ciclano Jose de Sousa",
"telefone": "88-9991-1293",
"endereco": "Rua Acula, 1020 - Junco",
"referencia": "Proximo a Dona Benedita",
"data_nascimento": "1980-10-10",
"created_at": "2016-11-25 20:05:12",
"updated_at": "2016-11-25 20:05:12"
},
{
"id": 2,
"nome": "Francisco de Almeida",
"telefone": "88-99121-2312",
"endereco": "Av Jose Anchieta, 360 - Cidade dos Funcionarios",
"referencia": "Em frente a Wender Variedades",
"data_nascimento": "1943-06-10",
"created_at": "2016-11-25 20:05:12",
"updated_at": "2016-11-25 20:05:12"
}
]
```

#### Pedido:  /api/pedido/1?includes=produto
```
{
"id": 1,
"observacao": "Entregar.",
"status": 3,
"valor_entrega": 4.5,
"cliente_id": 2,
"entregadores_id": 2,
"created_at": "2016-11-25 20:06:03",
"updated_at": "2016-11-25 21:52:29",
  "produto": [
  {
    "id": 1,
    "nome": "Marmita 1",
    "descricao": "Arroz, feijão, bife e salada de tomate.",
    "custo": 15,
    "created_at": "2016-11-25 20:05:12",
    "updated_at": "2016-11-25 20:05:12",
    "pivot": {
      "pedido_id": 1,
      "produto_id": 1,
      "quantidade": 2,
      "valor": 15
    }
  },
    {
    "id": 3,
    "nome": "Marmita 3",
    "descricao": "Arroz, feijão, file de frango, creme de milho.",
    "custo": 14,
    "created_at": "2016-11-25 20:05:12",
    "updated_at": "2016-11-25 20:05:12",
    "pivot": {
      "pedido_id": 1,
      "produto_id": 3,
      "quantidade": 2,
      "valor": 14
    }
  }
 ]
}
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
