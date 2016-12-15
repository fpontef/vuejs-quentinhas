<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Cadastro de</small> {{ title }}</h1>
                <div class="col-md-6">
                    <input id="busca" type="text" class="form-control" placeholder="Digite o nome ou número do entregador" v-model="search">
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
                    <legend>Cadastro de Entregador</legend>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="nome">Nome</label>  
                      <div class="col-md-6">
                      <input v-model="entregador.nome" id="nome" name="nome" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="telefone">Telefone</label>  
                      <div class="col-md-4">
                      <input v-model="entregador.telefone" id="telefone" name="telefone" type="text" placeholder="ex: (88) 99123-1234" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="endereco">RG</label>  
                      <div class="col-md-8">
                      <input v-model="entregador.rg" id="endereco" name="endereco" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="referencia">CPF</label>  
                      <div class="col-md-8">
                      <input v-model="entregador.cpf" id="cnpj" name="cnpj" type="text" placeholder="" class="form-control input-md" required="">
                        
                      </div>
                    </div>
                    
                    <!-- Text input-->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="textinput">Empresa</label>  
                      <div class="col-md-4">
                      <select v-model="entregador.empresa_id">
                          <option v-for="empresa in listaDeEmpresas" v-bind:value="empresa.id">
                              {{ empresa.id }} | {{ empresa.nome }}
                          </option>
                      </select>
                        
                      </div>
                    </div>
             
                    <!-- Button (Double) -->
                    <div class="form-group">
                      <label class="col-md-4 control-label" for="button1id"></label>
                      <div class="col-md-8">
                        <button v-on:click.prevent="addCadastro" id="confirmarCadastro" name="confirmarCadastro" class="btn btn-primary" type="submit">Cadastrar entregador</button>
                        <button v-on:click="cancelarCadastro" id="cancelarAcao" name="cancelarAcao" class="btn btn-danger" type="button">Cancelar</button>
                      </div>
                    </div>
                    </fieldset>
                    </form>
                </div> <!-- col-md-12 -->
            </div> <!-- row --> 
                        <!--<pre>{{ entregador | json }}</pre>-->
        </div> <!-- mostrarCadastro -->
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>CNPJ</th>
                    <th>Empresa</th>
                    <th></th>
                    <th>Ações</th>
                    <th></th>
                </thead>
                <tbody>
                    <!-- Filtro seletivo: -->
                    <!--<tr v-if="search" v-for="entregador in entregadores | filterBy search in 'nome' 'telefone'">-->
                    <!-- Filtro mostra tudo-->
                    <tr v-for="entregador in entregadores | filterBy search in 'nome' 'telefone'">
                        <td>{{ entregador.id }}</td>
                        <td>{{ entregador.nome }}</td>
                        <td>{{ entregador.telefone }}</td>
                        <td>{{ entregador.rg }}</td>
                        <td>{{ entregador.cpf }}</td>
                        <td>{{ entregador.empresa_id }}</td>
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
    // protected $fillable = ['nome','telefone', 'rg', 'cpf', 'empresa_id' ];

    let apiUrl = "https://restphp-sobralense.c9users.io/public/api";

    export default {
        data() {
            return {
                isLoading: false,
                title: 'Entregador',
                search: '',
                entregadores: [],
                entregador: {
                    nome: '',
                    telefone: '',
                    rg: '',
                    cpf: '',
                    empresa_id: ''
                },
                mostrarCadastro: '',
                listaDeEmpresas: {}
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
                console.log("Load: Cadastro Loaded");
                this.showLoading();

                //Meu Teste:
                this.$http.get(apiUrl + '/entregador').then(
                    response => {
                        this.entregadores = response.json();
                        this.hideLoading();
                    },
                    error => {
                        console.error(error.status);
                        console.error(error);
                    }).finally(function() {
                    // this.hideLoading();
                });
            },
            loadEmpresas(){
                this.$http.get(apiUrl+'/empresa').then(
                    response => {
                        this.listaDeEmpresas = response.json();
                    },
                    error => {
                        console.error(error);
                    });
            },
            addCadastro() {
                // if (this.entregador.nome && this.entregador.telefone && this.entregador.endereco && this.entregador.referencia) {
                    this.$http.post(apiUrl + '/entregador', this.entregador)
                        .then(
                            response => {
                                console.log(response.status);
                                this.$set('entregador', {});
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
                var object = this.entregador;
                for (var key in object){
                    object[key] = '';
                }
                this.mostrarCadastro ^= true;
            }

        }, // Fim Methods
        created() {
            //Carrega todos os entregadores:
            this.loadCadastro();
            this.loadEmpresas();
        }
    };
</script>