<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Consulta de</small> {{ title }}</h1>
                <div class="col-md-6">
                    <input id="busca" type="text" class="form-control" placeholder="Digite o número do Pedido ou nome do Cliente" v-model="search">
                </div>
            </div> <!-- col-md-12 -->
        </div> <!-- row -->
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Produto</th>
                        <th>Cliente</th>
                        <th></th>
                        <th>Entregador</th>
                        <th></th>
                        <th></th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Filtro seletivo: -->
                    <!--<tr v-if="search" v-for="empresa in empresas | filterBy search in 'nome' 'telefone'">-->
                    <!-- Filtro mostra tudo-->
                    <tr v-for="pedido in pedidos | filterBy search in 'id' 'cliente.nome'">
                        <td>{{ pedido.id }}</td>
                        <td>
                            <ul>
                                <li v-for="item in pedido.produto ">
                                    {{ item.nome }} - Qtd:{{ item.pivot.quantidade }} - Valor Unit:{{item.pivot.valor}}
                                    <p>Total: R$ {{ item.pivot.quantidade * item.pivot.valor }}</p>
                                </li>
                            </ul>
                            Total Pedido: {{ pedido.soma.total_pedido + pedido.valor_entrega}}
                            
                        </td>
                        <td><ul>
                            <li>{{ pedido.cliente_id }} - {{ pedido.cliente.nome }}</li>
                            <li>{{ pedido.observacao }}</li>
                        </ul></td>
                        <td colspan=3 align="center">
                            <select v-model="pedido.entregadores_id">
                                <option v-for="entregador in listaEntregadores" v-bind:value="entregador.id">
                                    {{ entregador.id }} | {{ entregador.nome }}
                                </option>
                            </select>
                            <a href="#" @click.prevent="atualizaEntregador(pedido.id, pedido.entregadores_id)"><span class="glyphicon glyphicon-ok"></span></a>
                        </td>
                        <td colspan=3 align="center">
                            <select v-model="pedido.status">
                                <option v-for="i in status" v-bind:value="i.value">
                                    {{ i.value }} | {{ i.text }}
                                </option>
                            </select>
                            <a href="#" @click="atualizaStatus(pedido.id, pedido.status)"><span class="glyphicon glyphicon-ok"></span></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!--DEBUG-->
            <!--<pre>{{ $data.pedidos | json }}</pre>-->
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

    // var list = '';
    // Vue.filter('subtotal', function (list, key1, key2) {
    //     return list.reduce(function(total, item) {
    //         return total + item[key1] * item[key2]
    //     }, 0)
    // })

    export default {
        data() {
            return {
                isLoading: false,
                title: 'Pedidos',
                search: '',
                pedidos: '',
                listaEntregadores:'',
                // entregadores_id:'',
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
            showLoading() {
                this.isLoading = true;
            },
            hideLoading() {
                this.isLoading = false;
            },
            loadCadastro() {
                this.showLoading();

                //Meu Teste:
                this.$http.get(apiUrl + '/pedido').then(
                    response => {
                        this.pedidos = response.json();
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
                if (this.empresa.nome && this.empresa.telefone && this.empresa.endereco && this.empresa.referencia) {
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
                }
                else {
                    window.alert("Verificar dados que faltam no cadastro.");
                }

            },
            cancelarCadastro() {
                var object = this.entregador;
                for (var key in object) {
                    object[key] = '';
                }
                this.mostrarCadastro ^= true;
            },
            loadEntregadores() {
                this.$http.get(apiUrl + '/entregador').then(
                    response => {
                        this.listaEntregadores = response.json();
                    },
                    error => {
                        console.error(error.status);
                        console.error(error);
                    }).finally(function() {
                });
            },
            atualizaEntregador(id, entregadores_id){
                this.$http.put(apiUrl + '/pedido/'+id, {"entregadores_id": entregadores_id}).then(
                    response => {
                        // this.pedidos.id = response.json();
                        console.log('Update do ' + id + ' OK!');
                    },
                    error => {
                        console.error(error.status);
                        console.error(error);
                        this.errorLoadPedidos = error;
                    }).finally(function() {
                    // this.hideLoading();
                });
            },
            atualizaStatus(id, status){
                this.$http.put(apiUrl + '/pedido/'+id, {"status": status}).then(
                    response => {
                        console.log('Update do ' + id + ' OK!');
                    },
                    error => {
                        console.error(error.status);
                        console.error(error);
                        this.errorLoadPedidos = error;
                    }).finally(function() {
                    // this.hideLoading();
                });
            },

        }, // Fim Methods
        created() {
            //Carrega todos os empresas:
            this.loadCadastro();
            this.loadEntregadores();
        },
    };
</script>