<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Cadastro de</small> {{ title }}</h1>
                <div class="col-md-6">
                    <input id="busca" type="text" class="form-control" placeholder="Digite o nome ou número do produto" v-model="search">
                </div>
                <div class="col-md-6">
                    <button class="btn btn-primary" v-on:click="mostrarCadastro ^= true">Cadastrar {{ title }}</button>
                </div>
            </div> <!-- col-md-12 -->
        </div> <!-- row -->
        <div v-show="mostrarCadastro">
            <div class="row">
                <div class="col-md-12">
                    <form class="form-horizontal">
                    <fieldset>
                    
                    <!-- Form Name -->
                    <legend>Cadastro de Empresa</legend>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="nome">Nome</label>  
                      <div class="col-md-6">
                      <input v-model="produto.nome" id="nome" name="nome" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="telefone">Descrição</label>  
                      <div class="col-md-4">
                      <input v-model="produto.descricao" id="telefone" name="telefone" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="endereco">Custo</label>  
                      <div class="col-md-8">
                      <input v-model="produto.custo" id="endereco" name="endereco" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Button (Double) -->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="button1id"></label>
                      <div class="col-md-8">
                        <button v-on:click.prevent="addCadastro" id="confirmarCadastro" name="confirmarCadastro" class="btn btn-primary" type="submit">Cadastrar produto</button>
                        <button v-on:click="cancelarCadastro" id="cancelarAcao" name="cancelarAcao" class="btn btn-danger" type="button">Cancelar</button>
                      </div>
                    </div>
                    </fieldset>
                    </form>
                </div> <!-- col-md-12 -->
            </div> <!-- row --> 
                        <!--<pre>{{ produto | json }}</pre>-->
        </div> <!-- mostrarCadastro -->
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Custo</th>
                    <th></th>
                    <th>Ações</th>
                    <th></th>
                </thead>
                <tbody>
                    <!-- Filtro seletivo: -->
                    <!--<tr v-if="search" v-for="produto in produtos | filterBy search in 'nome'">-->
                    <!-- Filtro mostra tudo-->
                    <tr v-for="produto in produtos | filterBy search in 'nome' 'telefone'">
                        <td>{{ produto.id }}</td>
                        <td>{{ produto.nome }}</td>
                        <td>{{ produto.descricao }}</td>
                        <td>R$ {{ produto.custo }}</td>
                        <td colspan=3 align="center">
                            <a href="#"><span class="glyphicon glyphicon-edit"></span></span></a>
                        <!--</td>-->
                        <!--<td colspan=3>-->
                            <a href="#"><span class="glyphicon glyphicon-remove"></span></a>
                        <!--</td>-->
                        <!--<td colspan=3>-->
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
    //  protected $fillable = ['nome','descricao','custo'];

    let apiUrl = "https://restphp-sobralense.c9users.io/public/api";

    export default {
        data() {
            return {
                isLoading: false,
                title: 'Produto',
                search: '',
                produtos: [],
                produto: {
                    nome: '',
                    descricao: '',
                    custo: ''
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
            loadCadastro() {
                this.showLoading();

                //Meu Teste:
                this.$http.get(apiUrl + '/produto').then(
                    response => {
                        this.produtos = response.json();
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
                // if (this.produto.nome && this.produto.telefone && this.produto.endereco && this.produto.referencia) {
                this.$http.post(apiUrl + '/produto', this.produto)
                    .then(
                        response => {
                            console.log(response.status);
                            this.$set('produto', {});
                            this.loadCadastro();
                        },
                        error => {
                            console.log(error.status);
                            console.error(error);
                        });
                // }
                // else {
                //     window.alert("Verificar dados que faltam no cadastro.");
                // }

            },
            cancelarCadastro() {
                var object = this.produto;
                for (var key in object) {
                    object[key] = '';
                }
                this.mostrarCadastro ^= true;
            }

        }, // Fim Methods
        created() {
            //Carrega todos os produtos:
            this.loadCadastro();
        }
    };
</script>
