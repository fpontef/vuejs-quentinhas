<template>
    <a v-show="isLoading">Carregando...</a>
    <div class="container">
        <h1>{{ title }}</h1>
        <p>
            <input type="text" placeholder="Digite o nome ou número do Cliente" v-model="search">
            <a href="#" class="button" @click.prevent="searchClientes">Buscar</a> | 
            <a href="#" class="button" @click.prevent="loadClientes">Buscar Todos</a>
        </p>
        <table border="1">
            <thead>
                <th>id</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Referência</th>
                <th>Data de Nascimento</th>
                <td>Ações</td>
            </thead>
            <tbody>
                <!-- Filtro seletivo: -->
                <!--<tr v-if="search" v-for="cliente in clientes | filterBy search in 'nome' 'telefone'">-->
                <!-- Filtro mostra tudo-->
                <!--<tr v-for="cliente in clientes | filterBy search in 'nome' 'telefone'">-->
                <tr v-for="cliente in clientes">
                    <td>{{ cliente.id }}</td>
                    <td>{{ cliente.nome }}</td>
                    <td>{{ cliente.telefone }}</td>
                    <td>{{ cliente.endereco }}</td>
                    <td>{{ cliente.referencia }}</td>
                    <td>{{ cliente.data_nascimento }}</td>
                    <td><a href="#">Editar</a>|<a href="#">Apagar</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    let apiUrl = "https://restphp-sobralense.c9users.io/public/api";

    export default {
        data() {
                return {
                    isLoading: false,
                    title: 'Clientes CRUD',
                    search: '',
                    clientes: [],
                    selected: {},
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
                        },
                        error => {
                            console.log(error);
                        }).finally(function() {
                        this.hideLoading();
                    });
                },
                searchClientes() {
                    this.$http.get(apiUrl + '/busca?nome='+this.search).then(
                        response => {
                            this.clientes = response.json();
                        }, error => {
                            console.log(error);
                        });
                }
            
            }, // Fim Methods
            created() {
            }
    };
</script>