import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve=>(require(["@/page/Home.vue"],resolve)),
    },
    {
      path: '/blockDetails',
      name: 'blockDetail',
      component: resolve=>(require(["@/page/BlockDetails.vue"],resolve)),
    },
    {
      path: '/blockDH',
      name: 'BlockDH',
      component: resolve=>(require(["@/page/BlockDH.vue"],resolve)),
    },
    {
      path: '/latestBlock',
      name: 'LatestBlock',
      component: resolve=>(require(["@/page/LatestBlock.vue"],resolve)),
    },
    {
      path: '/latestTransaction',
      name: 'LatestTransaction',
      component: resolve=>(require(["@/page/LatestTransaction.vue"],resolve)),
    },
    {
      path: '/latestDhList',
      name: 'latestDhList',
      component: resolve=>(require(["@/page/latestDhList.vue"],resolve)),
    },
    {
      path: '/transactionHash',
      name: 'TransactionHash',
      component: resolve=>(require(["@/page/TransactionHash.vue"],resolve)),
    },
    {
      path: '/address',
      name: 'Address',
      component: resolve=>(require(["@/page/Address.vue"],resolve)),
    }
  ]
})

const originalPush = Router.prototype.push
   Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router