<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Consulta de</small> {{ title }}</h1>
                <form >
                    <div class="form-group">
                      <div class="col-md-6">
                          Entregador: 
                      <select v-model="entregadores_id">
                          <option v-for="entregador in entregadores" v-bind:value="entregador.id">
                              {{ entregador.id }} | {{ entregador.nome }}
                          </option>
                      </select>
                      </div> <!-- col-md-6-->
                    </div><!-- form-group-->
                </form>
                <div class="col-md-6">
                        <button class="btn btn-primary" v-on:click="loadPedidos(this.entregadores_id)">Solicitar Relatório</button>
                </div> <!-- col-md-6-->
                
                <div class="col-md-12">
                    <div class="table-responsive">
                        <table class="table">
                            <thead>
                                <th>id</th>
                                <th>Status</th>
                                <th>Valor Entrega</th>
                                <th>Criado em</th>
                            </thead>
                            <tbody>
                                <tr v-for="i in listaPedidosEntregador.pedido | orderBy 'status' -1 | filterBy search in 'status' 'created_at'">
                                    <td>{{ i.id }}</td>
                                    <td>
                                        <select disabled v-model="i.status">
                                            <option v-for="i in status" v-bind:value="i.value">
                                                {{ i.value }} | {{ i.text }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>R$ {{ i.valor_entrega }}</td>
                                    <td>{{ i.created_at }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div><!--responsive-->
                </div><!--col-md-12-->
            </div> <!--col-md-12-->
        </div><!--row-->
        <a v-show="isLoading">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </a>
    </div> <!-- container -->
    <!--<pre>{{ $data | json }}</pre>-->
</template>
<script>
    let apiUrl = "https://restphp-sobralense.c9users.io/public/api";

    export default {
        data() {
            return {
                isLoading: false,
                title: 'Entregas',
                search: '',
                entregadores: '',
                entregadores_id: '',
                listaPedidosEntregador: '',
                mostrarCadastro: '',
                errorLoadPedidos: '',
                status: [{
                    value: 1,
                    text: 'PENDENTE'
                }, {
                    value: 2,
                    text: 'EM TRÂNSITO'
                }, {
                    value: 3,
                    text: 'CANCELADO'
                }, {
                    value: 4,
                    text: 'ENTREGUE'
                }]
            };

        },
        methods: {
            // showLoading() {
            //     this.isLoading = true;
            // },
            // hideLoading() {
            //     this.isLoading = false;
            // },
            loadCadastro() {
                this.$http.get(apiUrl + '/entregador').then(
                    response => {
                        this.entregadores = response.json();
                    },
                    error => {
                        console.error(error.status);
                        console.error(error);
                    }).finally(function() {
                    // this.hideLoading();
                });
            },
            loadPedidos(id) {
                this.$http.get(apiUrl + '/entregador/' + id + '?includes=pedido').then(
                    response => {
                        this.listaPedidosEntregador = response.json();
                    },
                    error => {
                        console.error(error.status);
                        console.error(error);
                        this.errorLoadPedidos = error;
                    }).finally(function() {
                    // this.hideLoading();
                    if (this.errorLoadPedidos.status === 404) {
                        alert('No momento, sem entregas em nome do profissional.');
                    }
                });
            },
            solicitarEntregas(id) {
                console.log('entregadores: ' + id);
            },

        }, // Fim Methods
        created() {
            //Carrega todos os cadastros:
            this.loadCadastro();
        }
    };
</script>