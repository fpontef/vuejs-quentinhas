<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h1><small>Controle de </small> {{ title }}</h1>
                <div class="col-md-5">
                    <button v-link="{ path: 'listaPedidos' }" class="btn btn-lg btn-primary">Lista de Pedidos</button>
                    <router-link to="listaPedidos">Pedidos</router-link>
                </div>
                <div class="col-md-5">
                    <button v-link="{ path: '/listaPedidos' }" class="btn btn-lg btn-default">Relatório de Entregas</button>
                </div>
            </div> <!-- col-md-12 -->
        </div> <!-- row -->
    </div> <!-- container -->
</template>
<script>
    export default {
        data() {
            return {
                title: 'Relatório',
            };
        }

    };
</script>