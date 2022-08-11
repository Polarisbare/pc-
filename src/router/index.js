import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'
import Dashboard from '@/views/Layout/Dashboard.vue'
import Article from '@/views/Layout/Article.vue'
import store from '@/store/index.js'//导入数据中心

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

// 路由守卫
router.beforeEach((to,from,next) => {
  // 1.获取token  数据中心的
  // 组件内：this.$store
 let token = store.state.user.token 
 if(token){
  next()
 }else{
  if(to.path == '/login'){
    next()
  }else{
    next('/login')
  }
 }

})






export default router
