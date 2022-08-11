import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'
import Dashboard from '@/views/Layout/Dashboard.vue'
import Article from '@/views/Layout/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/article',
        component: Article
      },
      {
        path: '/dashboard',
        component: Dashboard
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
