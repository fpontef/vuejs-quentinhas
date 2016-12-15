<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Cadastro de</small> {{ title }}</h1>
                <div class="col-md-6">
                    <input id="busca" type="text" class="form-control" placeholder="Digite o nome ou número do Cliente" v-model="search">
                    <!--Não necessita do botão de busca, pois é realtime e já puxa tudo, mas segue o que posso chamar depois.-->
                    <!--<a href="#" class="button" @click.prevent="searchClientes">Buscar</a> | -->
                    <!--<a href="#" class="button" @click.prevent="loadClientes">Buscar Todos</a>-->
                </div>
                <div class="col-md-6">
                        <button class="btn btn-primary" v-on:click="mostrarCadastro ^= true">Cadastrar Novo Cliente</button>
                </div>
            </div> <!-- col-md-12 -->
        </div> <!-- row -->
        <div v-show="mostrarCadastro">
            <div class="row">
                <div class="col-md-12">
                    <form class="form-horizontal">
                    <fieldset>
                    
                    <!-- Form Name -->
                    <legend>Cadastro de Clientes</legend>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="nome">Nome</label>  
                      <div class="col-md-6">
                      <input v-model="cliente.nome" id="nome" name="nome" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="telefone">Telefone</label>  
                      <div class="col-md-4">
                      <input v-model="cliente.telefone" id="telefone" name="telefone" type="text" placeholder="ex: (88) 99123-1234" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="endereco">Endereço</label>  
                      <div class="col-md-8">
                      <input v-model="cliente.endereco" id="endereco" name="endereco" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="referencia">Referência</label>  
                      <div class="col-md-8">
                      <input v-model="cliente.referencia" id="referencia" name="referencia" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="textinput">Data de Nascimento</label>  
                      <div class="col-md-4">
                      <input v-model="cliente.data_nascimento" id="textinput" name="textinput" type="text" placeholder="Ex: 1992/12/30 - Ano/Mês/Dia" class="form-control input-md">
                        
                      </div>
                    </div>
                    <!-- Button (Double) -->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="button1id"></label>
                      <div class="col-md-8">
                        <button v-on:click.prevent="addCliente" id="confirmarCadastro" name="confirmarCadastro" class="btn btn-primary" type="submit">Cadastrar Cliente</button>
                        <button v-on:click="cancelarCadastro" id="cancelarAcao" name="cancelarAcao" class="btn btn-danger" type="button">Cancelar</button>
                      </div>
                    </div>
                    </fieldset>
                    </form>
                </div> <!-- col-md-12 -->
            </div> <!-- row --> 
                        <!--<pre>{{ cliente | json }}</pre>-->
        </div> <!-- mostrarCadastro -->
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Referência</th>
                    <th>Data de Nascimento</th>
                    <th></th>
                    <th>Ações</th>
                    <th></th>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientes | filterBy search in 'nome' 'telefone'">
                        <td>{{ cliente.id }}</td>
                        <td>{{ cliente.nome }}</td>
                        <td>{{ cliente.telefone }}</td>
                        <td>{{ cliente.endereco }}</td>
                        <td>{{ cliente.referencia }}</td>
                        <td>{{ cliente.data_nascimento }}</td>
                        <td colspan=3 align="center">
                            <a href="#"><span class="glyphicon glyphicon-edit"></span></span></a>
                            <a href="#"><span class="glyphicon glyphicon-remove"></span></a>
                            <a href="#"><span class="glyphicon glyphicon-ok"></span></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div> <!-- table-responsive -->
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
    let apiUrl = "https://restphp-sobralense.c9users.io/public/api";

    export default {
        data() {
            return {
                isLoading: false,
                title: 'Clientes',
                search: '',
                clientes: [],
                cliente: {
                    nome: "",
                    telefone: "",
                    endereco: "",
                    referencia: "",
                    data_nascimento: ""
                },
                mostrarCadastro: '',
            };

        },
        methods: {
            showLoading() {
                this.isLoading = true;
            },
            hideLoading() {
                this.isLoading = false;
            },
            loadClientes() {
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
            addCliente() {
                if (this.cliente.nome && this.cliente.telefone && this.cliente.endereco && this.cliente.referencia) {
                    this.$http.post(apiUrl + '/cliente', this.cliente)
                        .then(
                            response => {
                                console.log(response.status);
                                this.$set('cliente', {});
                                this.loadClientes();
                            },
                            error => {
                                console.log(error.status);
                                console.error(error);
                            });
                }
                else {
                    window.alert("Verificar dados que faltam no cadastro.");
                }

            },
            cancelarCadastro() {
                var object = this.cliente;
                for (var key in object) {
                    object[key] = '';
                }
                this.mostrarCadastro ^= true;
            },
            verDetalhes(id) {
                console.log('apiUrl' + '/cliente/' + id + '?includes=pedido');
            }

        }, // Fim Methods
        created() {
            //Carrega todos os clientes:
            this.loadClientes();
        }
    };
</script>