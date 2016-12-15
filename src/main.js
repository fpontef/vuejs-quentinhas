// require() is the Node module system (CommonJS) in ES5. import is ES6 module syntax.
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Inicio from './Components/Inicio.vue'
import Clientes from './Components/Clientes/Clientes.vue'
import Empresas from './Components/Empresas/Empresas.vue'
import Entregadores from './Components/Entregadores/Entregadores.vue'
import Pedidos from './Components/Pedidos/Pedidos.vue'
import Produtos from './Components/Produtos/Produtos.vue'
import Relatorio from './Components/Relatorio/Relatorio.vue'
import ListaPedidos from './Components/Relatorio/ListaPedidos.vue'
import ListaEntregues from './Components/Relatorio/ListaEntregues.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  linkActiveClass: 'active'
});

// new Vue({
//   el: 'body',
//   components: { App }
// })

// Original:
router.map({
  '*': { component: Inicio },
  '/': { component: Inicio },
  '/clientes': { component: Clientes },
  '/empresas': { component: Empresas},
  '/entregadores': { component: Entregadores },
  '/pedidos': { component: Pedidos },
  '/produtos': { component: Produtos },
  '/relatorio': { component: Relatorio },
  '/listaPedidos': {component: ListaPedidos },
  '/listaEntregues': {component: ListaEntregues },
});

// DOCUMENTACAO - Route Config Object (obs: Router.map agora é deprecated!!! )

// A route config object can contain two fields:

// component: The Vue component to render into the top-level <router-view> outlet when this path is matched. The value could either be a constructor returned by calling Vue.extend, or a plain component options object. In the latter case the router will implicitly call Vue.extend for you.

// subRoutes: You can nest another sub route-map here. For each sub path in the routeRoutes map, the router will match it against the full path by appending it to the parent path. The matched component will be rendered into the parent route component's <router-view> outlet.

// Example

// router.map({
//   // component constructor
//   '/a': {
//     component: Vue.extend({ /* ... */ })
//   },
//   // plain component options object
//   '/b': {
//     component: {
//       template: '<p>Hello from /b</p>'
//     }
//   },
//   // nested routes
//   '/c': {
//     component: {
//       // simply render the child view
//       template: '<router-view></router-view>'
//     },
//     subRoutes: {
//       // rendered when the path is /c/d
//       '/d': { component: { template: 'D' }},
//       // rendered when the path is /c/e
//       '/e': { component: { template: 'E' }}
//     }
//   }
// })

router.start(App, "App");