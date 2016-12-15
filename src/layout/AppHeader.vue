<template>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" v-link="{ path: '/'}"><span class="glyphicon glyphicon-home"></span></a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li v-link-active><a v-link="{ path: '/clientes' }"><span class="glyphicon glyphicon-user"></span> Clientes</a></li>
            <li v-link-active><a v-link="{ path: '/pedidos' }"><span class="glyphicon glyphicon-th-list"></span> Pedidos</a></li>
            <li v-link-active><a v-link="{ path: '/listaPedidos' }"><span class="glyphicon glyphicon-th-list"></span> Fila de Pedidos</a></li>
            <li v-link-active><a v-link="{ path: '/produtos' }"><span class="glyphicon glyphicon-cutlery"></span> Produtos</a></li>
            <!--<li v-link-active><a v-link="{ path: '/relatorio'}"><span class="glyphicon glyphicon-list-alt"></span> Relatório</a></li>-->

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-list-alt"></span> Gerenciamento <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li v-link-active><a v-link="{ path: '/empresas' }"><span class="glyphicon glyphicon-briefcase"></span> Empresas</a></li>
                <li v-link-active><a v-link="{ path: '/entregadores' }"><span class="glyphicon glyphicon-transfer"></span> Entregadores</a></li>
                <li v-link-active><a v-link="{ path: '/listaEntregues'}"><span class="glyphicon glyphicon-list-alt"></span> Entregas Efetuadas</a></li>
              </ul>
            </li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
</template>

<script>
  export default {
    
  }
</script>

<style>
  .container {
    margin-bottom: 10px;
  }
</style>