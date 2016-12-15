<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Cadastro de</small> {{ title }}</h1>
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                    Buscar Cliente
                </button>
                
                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">Buscar Cliente</h4>
                            </div>
                            <div class="modal-body">
                                <div class="col-md-12">
                                    <input id="busca" type="text" class="form-control" placeholder="Digite o nome ou número do pedido" v-model="search">
                                    <a href="#" class="button" @click.prevent="loadCadastroCliente">Carregar Cadastros</a>
                                <div class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <th>Nome</th>
                                            <th>Telefone</th>
                                            <th>Endereço</th>
                                            <th>Referência</th>
                                            <th>Data de Nascimento</th>
                                            <th>Ações</th>
                                        </thead>
                                        <tbody>
                                            <tr v-for="cliente in clientes | filterBy search in 'nome' 'telefone'">
                                                <td>{{ cliente.nome }}</td>
                                                <td>{{ cliente.telefone }}</td>
                                                <td>{{ cliente.endereco }}</td>
                                                <td>{{ cliente.referencia }}</td>
                                                <td>{{ cliente.data_nascimento }}</td>
                                                <td>
                                                    <a @click.prevent="selectClient(cliente.id, cliente.nome)" data-dismiss="modal" href="#"><span class="glyphicon glyphicon-ok"></span></a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> <!-- table-responsive -->
                                </div> <!-- col-md-12 -->
                            </div> <!-- modal-body -->
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div> <!-- Modal -->
            </div> <!-- col-md-12 -->
        </div> <!-- row -->
            <div class="row">
                <div class="col-md-12">
                    <form class="form-horizontal">
                    <fieldset>

                     <!--Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="cliente_nome">Cliente</label>  
                      <div class="col-md-6">
                      <input disabled v-model="clienteNomeTemp" id="cliente_nome" name="cliente_nome" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>                  
                    
                     <!--Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="cliente_id">Cliente ID</label>  
                      <div class="col-md-6">
                      <input disabled v-model="pedido.cliente_id" id="cliente_id" name="cliente_id" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                     <!--Carrega lista dos Produtos -->
                    <div class="table-responsive" align="center">
                        <table class="table" style="width:80%">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Custo</th>
                                    <th>Qtd</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="produto in listaDeProdutos">
                                    <td>{{produto.id}}</td>
                                    <td>{{produto.nome}}</td>
                                    <td>{{produto.descricao}}</td>
                                    <td>R$ {{produto.custo}}</td>
                                    <td><input id="{{produto.id}}" type="number" value="1" v-model="produto.quantidade"></td>
                                    <td><a @click.prevent="addTempProdutos(produto.id, produto.nome, produto.custo, produto.quantidade)">Adicionar Produto</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div align="center">
                        <div class="jumbotron" v-if="pedido.produtos">
                            <h4>Lista de Produtos do Pedido</h4>
                        <ul>
                           <li v-for="(index, p) in pedido.produtos"> Id: {{ p.produto_id }} - Nome: {{ p.nome }} - Qtd: {{ p.quantidade }} - R$ {{ p.valor }}<button @click.prevent='removeTempProd(index, p.valor, p.quantidade)'> Remover</button></li>
                        </ul>
                        </div>
                    </div>

                     <!--Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="referencia">Observacao</label>  
                      <div class="col-md-8">
                      <input v-model="pedido.observacao" id="observacao" name="observacao" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                     <!--Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="textinput">Taxa Entrega</label>  
                      <div class="col-md-4">
                      <input v-model="pedido.valor_entrega" id="textinput" name="textinput" type="text" value="4.50" class="form-control input-md">
                        
                      </div>
                    </div>                     
                    
                    <!--Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="textinput">Total Pedido: R$</label>  
                      <div class="col-md-4">
                      <input disabled v-model="valorPedido + (this.pedido.valor_entrega*1)" id="textinput" name="textinput" type="text" class="form-control input-md">
                        
                      </div>
                    </div>

                     <!--Button (Double) -->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="button1id"></label>
                      <div class="col-md-8">
                        <button v-on:click.prevent="addCadastro" id="confirmarCadastro" name="confirmarCadastro" class="btn btn-primary" type="submit">Cadastrar pedido</button>
                        <button v-on:click="cancelarCadastro" id="cancelarAcao" name="cancelarAcao" class="btn btn-danger" type="button">Cancelar</button>
                      </div>
                    </div>
                    </fieldset>
                    </form>
                </div> <!-- col-md-12 -->
            </div> <!-- row --> 
                        <!--<pre>{{ pedido | json }}</pre>-->
        <a v-show="isLoading">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </a>
    </div> <!-- container -->
</template>
<script>
    //protected $fillable = ['cliente_id', 'produto_id', 'entregador_id', 'quantidade', 
    //'observacao', 'status', 'valor_entrega'];
    let apiUrl = "https://restphp-sobralense.c9users.io/public/api";
    
    export default {
        data() {
            return {
                isLoading: false,
                title: 'Pedido',
                search: '',
                clienteNomeTemp: '',
                clientes: [],
                cliente: {},
                cliente_selected: '',
                mostrarCadastro: '',
                pedido: {
                    cliente_id: '',
                    produtos: [],
                    observacao: '',
                    status: 1,
                    valor_entrega: 4.50
                },
                valorPedido: 0,
                listaDeProdutos: {},
                listaTempProduto: {},
            };

        },
        methods: {
            showLoading() {
                this.isLoading = true;
            },
            hideLoading() {
                this.isLoading = false;
            },
            loadCadastroCliente() {
                this.showLoading();

                //Meu Teste:
                this.$http.get(apiUrl + '/cliente').then(
                    response => {
                        this.clientes = response.json();
                        this.hideLoading();
                    },
                    error => {
                        console.error(error.status);
                        console.error(error);
                    }).finally(function() {
                    // this.hideLoading();
                });
            },
            addCadastro() {
                if (this.pedido.cliente_id && this.pedido.produtos.length !== 0) {
                    this.pedido.produtos.forEach(i => {
                        delete(i.nome);
                    });
                    this.$http.post(apiUrl + '/pedido', this.pedido)
                        .then(
                            response => {
                                console.log(response.status);
                                this.$set('pedido', {
                                    cliente_id: '',
                                    produtos: [],
                                    observacao: '',
                                    status: 1,
                                    valor_entrega: 4.50
                                });
                                this.$set(this.valorPedido, 0);
                                this.loadCadastro();
                            },
                            error => {
                                console.log(error.status);
                                console.error(error);
                            });
                    this.valorPedido = 0;
                    this.clienteNomeTemp = '';
                }
                else {
                    window.alert("Verificar dados que faltam no cadastro.");
                }

            },
            cancelarCadastro() {
                var object = this.pedido;
                for (var key in object) {
                    object[key] = '';
                }
                this.mostrarCadastro ^= true;
            },
            selectClient(id, nome) {
                this.clienteNomeTemp = nome;
                this.pedido.cliente_id = id;
                console.log(id + ' ' + nome);
            },
            loadProdutos() {
                this.$http.get(apiUrl + '/produto').then(
                    response => {
                        this.listaDeProdutos = response.json();
                    },
                    error => {
                        console.error(error);
                    });
            },
            addTempProdutos(id, nome, custo, quantidade) {
                this.pedido['produtos'].push({
                    'produto_id': id,
                    'nome': nome,
                    'quantidade': quantidade,
                    'valor': custo
                });
                this.atualizarValor(a = "add", custo, quantidade);
            },
            removeTempProd(index, valor, quantidade) {
                this.pedido.produtos.splice(index, 1);
                this.atualizarValor(a = "del", valor, quantidade);
            },
            atualizarValor(a, custo, quantidade) {
                let total;
                if (a === "add") {
                    total = quantidade * custo;
                    this.valorPedido = total + this.valorPedido;
                }
                else {
                    total = quantidade * custo;
                    this.valorPedido = this.valorPedido - total;
                }
            }

        }, // Fim Methods
        created() {
            //Carrega todos Clientes e Produtos:
            this.loadCadastroCliente();
            this.loadProdutos();
            // this.atualizarValor();
        }
    };
</script>
<style>
    /* Important part */
    
    .modal-dialog {
        overflow-y: initial !important
    }
    
    .modal-body {
        height: 350px;
        overflow-y: auto;
    }
</style>