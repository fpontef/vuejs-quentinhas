<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Cadastro de</small> {{ title }}</h1>
                <div class="col-md-6">
                    <input id="busca" type="text" class="form-control" placeholder="Digite o nome ou número do empresa" v-model="search">
                    <!--Não necessita botão de busca, pois é realtime e já puxa tudo.-->
                    <!--<a href="#" class="button" @click.prevent="searchCadastro">Buscar</a> | -->
                    <!--<a href="#" class="button" @click.prevent="loadCadastro">Buscar Todos</a>-->
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
                      <input v-model="empresa.nome" id="nome" name="nome" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="telefone">Telefone</label>  
                      <div class="col-md-4">
                      <input v-model="empresa.telefone" id="telefone" name="telefone" type="text" placeholder="ex: (88) 99123-1234" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="endereco">Endereço</label>  
                      <div class="col-md-8">
                      <input v-model="empresa.endereco" id="endereco" name="endereco" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="referencia">CNPJ</label>  
                      <div class="col-md-8">
                      <input v-model="empresa.cnpj" id="cnpj" name="cnpj" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="textinput">E-mail</label>  
                      <div class="col-md-4">
                      <input v-model="empresa.email" id="textinput" name="textinput" type="text" placeholder="Ex: 01/12/1992" class="form-control input-md">
                        
                      </div>
                    </div>

                    <!-- Button (Double) -->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="button1id"></label>
                      <div class="col-md-8">
                        <button v-on:click.prevent="addCadastro" id="confirmarCadastro" name="confirmarCadastro" class="btn btn-primary" type="submit">Cadastrar empresa</button>
                        <button v-on:click="cancelarCadastro" id="cancelarAcao" name="cancelarAcao" class="btn btn-danger" type="button">Cancelar</button>
                      </div>
                    </div>
                    </fieldset>
                    </form>
                </div> <!-- col-md-12 -->
            </div> <!-- row --> 
                        <!--<pre>{{ empresa | json }}</pre>-->
        </div> <!-- mostrarCadastro -->
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>CNPJ</th>
                    <th>e-mail</th>
                    <th></th>
                    <th>Ações</th>
                    <th></th>
                </thead>
                <tbody>
                    <!-- Filtro seletivo: -->
                    <!--<tr v-if="search" v-for="empresa in empresas | filterBy search in 'nome' 'telefone'">-->
                    <!-- Filtro mostra tudo-->
                    <tr v-for="empresa in empresas | filterBy search in 'nome' 'telefone'">
                        <td>{{ empresa.id }}</td>
                        <td>{{ empresa.nome }}</td>
                        <td>{{ empresa.telefone }}</td>
                        <td>{{ empresa.endereco }}</td>
                        <td>{{ empresa.cnpj }}</td>
                        <td>{{ empresa.email }}</td>
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
                title: 'Empresa',
                search: '',
                empresas: [],
                empresa: {
                    nome:'',
                    telefone:'',
                    endereco:'',
                    email:'',
                    cnpj: ''
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
                this.$http.get(apiUrl + '/empresa').then(
                    response => {
                        this.empresas = response.json();
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
                // if (this.empresa.nome && this.empresa.telefone && this.empresa.endereco && this.empresa.referencia) {
                    this.$http.post(apiUrl + '/empresa', this.empresa)
                        .then(
                            response => {
                                console.log(response.status);
                                this.$set('empresa', {});
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
                var object = this.empresa;
                for (var key in object){
                    object[key] = '';
                }
                this.mostrarCadastro ^= true;
            }

        }, // Fim Methods
        created() {
            //Carrega todos as empresas:
            this.loadCadastro();
        }
    };
</script>